import { APIApplicationCommandInteraction, GatewayCloseCodes, GatewayDispatchEvents, GatewayDispatchPayload, GatewayOpcodes, GatewayReceivePayload, GatewaySendPayload, InteractionType, GatewayHeartbeatData, GatewayInvalidSessionData, GatewayHelloData, APIMessageComponentInteraction, GatewayReadyDispatchData, GatewayInteractionCreateDispatchData, GatewayMessageCreateDispatchData, GatewayMessageUpdateDispatchData, GatewayMessageDeleteDispatchData, GatewayMessageDeleteBulkDispatchData, GatewayChannelPinsUpdateDispatchData, APIModalSubmitInteraction, ComponentType, APIMessageComponentButtonInteraction, APIMessageComponentSelectMenuInteraction } from "discord-api-types/v10"
import { WebSocket, WebSocketEventMap } from "ws"
import DiscordConfig from "../config/env/discord.config"
import DiscordGatewayClosedError from "../error/discord/gateway-closed.error"
import { DISCORD_DEFAULT_IDENTIFY_PAYLOAD } from "../const/discord/default"
import APIMessageComponentRoleSelectInteraction from "../types/discord/api-message-component-role-select-interaction"
 
export default class DiscordWebsocketConnection {
    private socket: WebSocket
    private heartbeatIntervalDelay: number
    private heartbeatInterval: ReturnType<typeof setInterval>
    private sequenceNumber: number
    private receivedHeartbeatAck: boolean = false
    private resumeWssUrl: string
    private sessionId: string
    public onCommand: (data: APIApplicationCommandInteraction) => Promise<void> | void
    public onReady: (data: GatewayReadyDispatchData) => Promise<void> | void
    public onMessageCreate: (data: GatewayMessageCreateDispatchData) => Promise<void> | void
    public onMessageDelete: (data: GatewayMessageDeleteDispatchData) => Promise<void> | void
    public onMessageDeleteBulk: (data: GatewayMessageDeleteBulkDispatchData) => Promise<void> | void
    public onMessageUpdate: (data: GatewayMessageUpdateDispatchData) => Promise<void> | void
    public onChannelPinsUpdate: (data: GatewayChannelPinsUpdateDispatchData) => Promise<void> | void
    public onMessageComponent: (data: APIMessageComponentInteraction) => Promise<void> | void
    public onModalSubmit: (data: APIModalSubmitInteraction) => Promise<void> | void
    public onButtonComponent: (data: APIMessageComponentButtonInteraction) => Promise<void> | void
    public onRoleSelect: (data: APIMessageComponentRoleSelectInteraction) => Promise<void> | void

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
        }, this.heartbeatIntervalDelay * jitter)
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
        switch(payload.t) {
            case GatewayDispatchEvents.Ready: this.handleReady(payload.d); break
            case GatewayDispatchEvents.InteractionCreate: this.handleInteractionCreate(payload.d); break
            case GatewayDispatchEvents.MessageCreate: this.onMessageCreate && this.onMessageCreate(payload.d); break
            case GatewayDispatchEvents.MessageDelete: this.onMessageDelete && this.onMessageDelete(payload.d); break
            case GatewayDispatchEvents.MessageDeleteBulk: this.onMessageDeleteBulk && this.onMessageDeleteBulk(payload.d); break
            case GatewayDispatchEvents.MessageUpdate: this.onMessageUpdate && this.onMessageUpdate(payload.d); break
            case GatewayDispatchEvents.ChannelPinsUpdate: this.onChannelPinsUpdate && this.onChannelPinsUpdate(payload.d); break
        }
        return
    }

    private handleReady(data: GatewayReadyDispatchData) {
        this.sessionId = data.session_id
        this.resumeWssUrl = data.resume_gateway_url
        this.onReady && this.onReady(data)
        return
    }

    private handleInteractionCreate(data: GatewayInteractionCreateDispatchData) {
        switch(data.type) {
            case InteractionType.ApplicationCommand: this.onCommand && this.onCommand(data); break
            case InteractionType.MessageComponent: {
                if (this.onMessageComponent) {
                    this.onMessageComponent(data)
                    break
                }
                switch(data.data.component_type) {
                    case ComponentType.Button: this.onButtonComponent && this.onButtonComponent(data as APIMessageComponentButtonInteraction); break
                    case ComponentType.RoleSelect: this.onRoleSelect && this.onRoleSelect(data as APIMessageComponentRoleSelectInteraction)
                }
                break
            }
            case InteractionType.ModalSubmit: this.onModalSubmit && this.onModalSubmit(data); break
        }
        return
    }
}

//Application Command Permissions Update
