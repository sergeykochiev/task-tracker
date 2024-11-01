import { WebSocket, WebSocketEventMap } from "ws"
import { GatewayDispatchPayload, GatewayCloseCodes, GatewayReceivePayload, GatewayOpcodes, GatewayHelloData, GatewayHeartbeatData, GatewayInvalidSessionData, GatewaySendPayload, GatewayDispatchEvents, GatewayReadyDispatchData } from "discord-api-types/v10"
import { DISCORD_DEFAULT_IDENTIFY_PAYLOAD } from "../const/discord/default"
import DiscordConfig from "../envcfg/discord.config"
 
export default class DiscordWebsocketConnection {
    private socket: WebSocket
    private heartbeatIntervalDelay: number
    private heartbeatInterval: ReturnType<typeof setInterval>
    private sequenceNumber: number
    private receivedHeartbeatAck: boolean = false
    private resumeWssUrl: string
    private sessionId: string
    public onEvent: (event: GatewayDispatchPayload) => any

    constructor(
        private wssUrl: string,
        private debug?: boolean
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
            case GatewayCloseCodes.DisallowedIntents: throw new Error(`${event.code}: Some/all intents are disallowed by the server - consider checking if all of provided intents are enabled in bot settings`)
            case GatewayCloseCodes.InvalidAPIVersion: throw new Error(`${event.code}: Invalid API version`)
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
            case GatewayOpcodes.Hello: this.handleHello(data.d); break
            case GatewayOpcodes.Heartbeat: this.handleHeartbeat(data.d); break
            case GatewayOpcodes.HeartbeatAck: this.handleHeartbeatAck(); break
            case GatewayOpcodes.InvalidSession: this.handleInvalidSession(data.d); break
            case GatewayOpcodes.Reconnect: this.handleReconnect(); break
            case GatewayOpcodes.Dispatch: this.handleDispatched(data); break
        }
        return
    }

    private handleHello(data: GatewayHelloData) {
        this.heartbeatIntervalDelay = data.heartbeat_interval
        const jitter = Math.random()
        setTimeout(() => {
            this.sendHeartbeat()
            this.keepTheHeartBeating()
            this.identify()
        }, !this.debug ? this.heartbeatIntervalDelay * jitter : 0)
        return
    }

    private handleHeartbeat(data: GatewayHeartbeatData) {
        this.sendHeartbeat()
        return
    }

    private handleHeartbeatAck() {
        this.receivedHeartbeatAck = true
        return
    }

    private handleInvalidSession(data: GatewayInvalidSessionData) {
        if (data) {
            this.resume()
            return
        }
        this.reconnect()
        return
    }
    
    private handleReconnect() {
        this.resume()
        return
    }

    private sendPayload(payload: GatewaySendPayload): void {
        console.log("Sending opcode:", GatewayOpcodes[payload.op])
        this.socket.send(JSON.stringify(payload))
        return
    }

    private keepTheHeartBeating() {
        console.log("Starting the heartbeat interval...")
        this.heartbeatInterval = setInterval(this.sendHeartbeatInterval.bind(this), this.heartbeatIntervalDelay)
        console.log("Heartbeating every", this.heartbeatIntervalDelay / 1000, "seconds")
        return
    }

    private stopTheHeart() {
        console.log("Stopping the heartbeat interval...")
        clearInterval(this.heartbeatInterval)
        return
    }

    private sendHeartbeatInterval() {
        if (!this.receivedHeartbeatAck) {
            console.log("Last heartbeat was not acknoledged, reconnecting...")
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
                token: DiscordConfig.TOKEN
            }
        })
        return
    }

    private identify() {
        this.sendPayload(DISCORD_DEFAULT_IDENTIFY_PAYLOAD)
        return
    }

    private handleDispatched(payload: GatewayDispatchPayload) {
        if (payload.s) this.sequenceNumber = payload.s
        console.log("Received dispatch event:", payload.t)
        if(payload.t == GatewayDispatchEvents.Ready) this.handleReady(payload.d)
        this.onEvent(payload)
    }

    private handleReady(data: GatewayReadyDispatchData) {
        this.sessionId = data.session_id
        this.resumeWssUrl = data.resume_gateway_url
        return
    }
}

//Application Command Permissions Update
