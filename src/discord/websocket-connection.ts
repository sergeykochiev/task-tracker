import { APIApplicationCommandInteraction, GatewayCloseCodes, GatewayDispatchEvents, GatewayDispatchPayload, GatewayOpcodes, GatewayReceivePayload, GatewaySendPayload, InteractionType } from "discord-api-types/v10"
import { WebSocket, WebSocketEventMap } from "ws"
import DEFAULT_IDENTIFY_PAYLOAD from "../const/discord/default-identification-payload"
import DiscordConfig from "../config/env/discord.config"
import DiscordGatewayClosedError from "../error/discord/gateway-closed-error"
import sendFollowupMessage from "../utils/discord/send-followup-message"
 
export default class DiscordWebsocketConnection {
    private socket: WebSocket
    private heartbeatIntervalDelay: number
    private heartbeatInterval: ReturnType<typeof setInterval>
    private sequenceNumber: number
    private receivedHeartbeatAck: boolean = false
    private resumeWssUrl: string
    private sessionId: string

    constructor(
        private wssUrl: string
    ) {}

    public async openAndInit(wssUrl: string = this.wssUrl) {
        this.socket = new WebSocket(wssUrl)
        this.socket.onopen = (e) => this.handleOpenEvent(e)
        this.socket.onerror = (e) => this.handleErrorEvent(e)
        this.socket.onclose = (e) => this.handleCloseEvent(e)
        this.socket.onmessage = (e) => this.handleMessageEvent(e)
        return
    }

    private async handleOpenEvent(event: WebSocketEventMap["open"]) {
        console.log("websocket opened")
        return
    }

    private async handleErrorEvent(event: WebSocketEventMap["error"]) {
        console.error(event)
        return
    }

    private async handleCloseEvent(event: WebSocketEventMap["close"]) {
        console.log("websocket closed, clean:", event.wasClean, "; code was: ", GatewayCloseCodes[event.code])
        this.stopTheHeart()
        switch(event.code as GatewayCloseCodes) {
            case GatewayCloseCodes.DisallowedIntents: throw new DiscordGatewayClosedError(event.code, "Some/all intents are disallowed by the server - consider checking if all of provided intents are enabled in bot settings")
            case GatewayCloseCodes.InvalidAPIVersion: throw new DiscordGatewayClosedError(event.code, "Invalid API version")
            case GatewayCloseCodes.InvalidIntents: console.log("invalid intents")
        }
        return
    }

    private async handleMessageEvent(event: WebSocketEventMap["message"]) {
        let data: GatewayReceivePayload
        try {
            data = JSON.parse(event.data.toString())
        } catch(e) {
            console.error("Error parsing websocket data: ", e)
            return
        }
        console.log("Received opcode:", GatewayOpcodes[data.op])
        switch(data.op) {
            case GatewayOpcodes.Hello: {
                this.heartbeatIntervalDelay = data.d.heartbeat_interval
                const jitter = Math.random()
                setTimeout(() => {
                    this.sendHeartbeat()
                    this.keepTheHeartBeating()
                    this.identify()
                }, this.heartbeatIntervalDelay * jitter)
                break
            }
            case GatewayOpcodes.Heartbeat: this.sendHeartbeat(); break
            case GatewayOpcodes.HeartbeatAck: this.receivedHeartbeatAck = true; break
            case GatewayOpcodes.InvalidSession: data.d ? this.resume() : this.reconnect(); break
            case GatewayOpcodes.Reconnect: this.resume(); break
            case GatewayOpcodes.Dispatch: this.handleDispatchedEvent(data); break
        }
    }

    private sendPayload(payload: GatewaySendPayload): void {
        console.log("Sending opcode:", GatewayOpcodes[payload.op])
        this.socket.send(JSON.stringify(payload))
        return
    }

    private keepTheHeartBeating() {
        this.heartbeatInterval = setInterval(this.sendHeartbeatInterval.bind(this), this.heartbeatIntervalDelay)
        return
    }

    private stopTheHeart() {
        clearInterval(this.heartbeatInterval)
        return
    }

    private sendHeartbeatInterval() {
        if (!this.receivedHeartbeatAck) {
            this.reconnect()
            return
        }
        this.sendHeartbeat()
        return
    }

    private sendHeartbeat() {
        this.sendPayload({
            op: GatewayOpcodes.Heartbeat,
            d: this.sequenceNumber || null
        })
        this.receivedHeartbeatAck = false
        return
    }

    private reconnect(url: string = this.wssUrl) {
        this.socket.close()
        this.stopTheHeart()
        this.openAndInit(url)
        return
    }

    private resume() {
        if (!this.resumeWssUrl) {
            this.reconnect()
            return
        }
        this.reconnect(this.resumeWssUrl)
        this.sendPayload({
            op: GatewayOpcodes.Resume,
            d: {
                session_id: this.sessionId,
                seq: this.sequenceNumber,
                token: DiscordConfig.DISCORD_TOKEN
            }
        })
        return
    }

    private identify() {
        this.sendPayload(DEFAULT_IDENTIFY_PAYLOAD)
        return
    }

    private handleDispatchedEvent(payload: GatewayDispatchPayload) {
        if (payload.s) this.sequenceNumber = payload.s
        switch(payload.t) {
            case GatewayDispatchEvents.Ready: {
                this.sessionId = payload.d.session_id
                this.resumeWssUrl = payload.d.resume_gateway_url
                break
            }
            case GatewayDispatchEvents.InteractionCreate: {
                if (payload.d.type === InteractionType.ApplicationCommand) this.handleCommands(payload.d)
            }
        }
    }

    private async handleCommands(data: APIApplicationCommandInteraction): Promise<void> {
        switch(data.data.name) {
            case "register": {
                sendFollowupMessage(data.application_id, data.token, {
                    content: `register command`,
                })
                return
            }
        }
    }
}