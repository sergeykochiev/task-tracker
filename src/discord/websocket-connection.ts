import { GatewayOpcodes, GatewayReceivePayload, GatewaySendPayload } from "discord-api-types/v10"
import DiscordWebsocketMessageEvent from "../types/discord/websocket/message-event"
import { WebSocket, WebSocketEventMap } from "ws"
 
export default class DiscordWebsocketConnection {
    socket: WebSocket
    heartbeatInterval: number
    sequenceNumber: number
    receivedHeartbeatAck: boolean = false

    constructor(
        private wssUrl: string
    ) {
        this.openAndInit()
    }

    async openAndInit() {
        this.socket = new WebSocket(this.wssUrl)
        this.socket.onopen = this.handleOpenEvent
        this.socket.onerror = this.handleErrorEvent
        this.socket.onclose = this.handleCloseEvent
        this.socket.onmessage = this.handleMessageEvent
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
        console.log("websocket closed, clean: ", event.wasClean)
        return
    }

    private async handleMessageEvent(event: DiscordWebsocketMessageEvent) {
        const [data, socket] = [event.data, event.target]
        let parsedData: GatewayReceivePayload
        try {
            parsedData = JSON.parse(data.toString())
        } catch(e) {
            console.error("Error parsing websocket message: ", e)
            return
        }
        parsedData.s && (this.sequenceNumber = parsedData.s)
        switch (parsedData.op) {
            case GatewayOpcodes.Hello: {
                this.heartbeatInterval = parsedData.d.heartbeat_interval
                setTimeout(this.sendHeartbeat, this.heartbeatInterval)
                this.keepTheHeartBeating()
            }
            case GatewayOpcodes.Heartbeat: {
                this.sendPayload({
                    op: GatewayOpcodes.Heartbeat,
                    d: this.sequenceNumber
                })
            }
            case GatewayOpcodes.HeartbeatAck: {
                this.receivedHeartbeatAck = true
            }
        }
    }

    private sendPayload(payload: GatewaySendPayload): void {
        this.socket.send(JSON.stringify(payload))
        return
    }

    private keepTheHeartBeating() {
        setInterval(() => {
            if (!this.receivedHeartbeatAck) {
                this.reconnect()
                return
            }
            this.sendHeartbeat()
        }, this.heartbeatInterval)
        return
    }

    private sendHeartbeat() {
        this.socket.send(JSON.stringify({
            op: GatewayOpcodes.Heartbeat,
            d: this.sequenceNumber
        }))
        this.receivedHeartbeatAck = false
        return
    }

    private reconnect() {
        this.socket.close()
        this.openAndInit()
        return
    }
}