import { GatewayOpcodes, GatewayReceivePayload, GatewaySendPayload } from "discord-api-types/v10"
import DiscordWebsocketMessageEvent from "../types/discord/websocket/message-event"
import { WebSocket, WebSocketEventMap } from "ws"
 
export default class DiscordWebsocketConnection {
    private socket: WebSocket
    private heartbeatIntervalDelay: number
    private heartbeatInterval: ReturnType<typeof setInterval>
    private sequenceNumber: number
    private receivedHeartbeatAck: boolean = false

    constructor(
        private wssUrl: string
    ) {}

    public async openAndInit() {
        this.socket = new WebSocket(this.wssUrl)
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
            }
            case GatewayOpcodes.Heartbeat: this.sendHeartbeat()
            case GatewayOpcodes.HeartbeatAck: this.receivedHeartbeatAck = true
        }
    }

    private sendPayload(payload: GatewaySendPayload): void {
        console.log("Sending payload:", payload)
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

    private reconnect() {
        this.socket.close()
        clearInterval(this.heartbeatInterval)
        this.openAndInit()
        return
    }
}