import { GatewayOpcodes, GatewayReceivePayload, GatewaySendPayload } from "discord-api-types/v10"
import DiscordWebsocketMessageEvent from "../types/discord/websocket/message-event"
import { WebSocket, WebSocketEventMap } from "ws"
import DEFAULT_IDENTIFY_PAYLOAD from "../const/discord/default-identification-payload"
import DiscordConst from "../const/discord/discord"
import DiscordConfig from "../config/env/discord.config"
 
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
        console.log("websocket closed, clean:", event.wasClean)
        return
    }

    private async handleMessageEvent(event: DiscordWebsocketMessageEvent) {
        let parsedData: GatewayReceivePayload
        try {
            parsedData = JSON.parse(event.data.toString())
        } catch(e) {
            console.error("Error parsing websocket message: ", e)
            return
        }
        parsedData.s && (this.sequenceNumber = parsedData.s)
        console.log("Received opcode:", GatewayOpcodes[parsedData.op])
        switch (parsedData.op) {
            case GatewayOpcodes.Hello: {
                this.heartbeatIntervalDelay = parsedData.d.heartbeat_interval
                const jitter = Math.random()
                setTimeout(this.sendHeartbeat.bind(this), this.heartbeatIntervalDelay * jitter)
                this.keepTheHeartBeating()
                this.identify()
            }
            case GatewayOpcodes.Heartbeat: this.sendHeartbeat()
            case GatewayOpcodes.HeartbeatAck: this.receivedHeartbeatAck = true
            case GatewayOpcodes.InvalidSession: parsedData.d ? this.resume() : this.reconnect()
            case GatewayOpcodes.Reconnect: this.resume()
            case GatewayOpcodes.Dispatch: this.handleDispatchedEvent(parsedData)
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
        clearInterval(this.heartbeatInterval)
        this.openAndInit(url)
        return
    }

    private resume() {
        if (!this.resumeWssUrl) throw new Error("cant resume: no resume url")
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

    private handleDispatchedEvent(payload: GatewayReceivePayload) {
        return
    }
}