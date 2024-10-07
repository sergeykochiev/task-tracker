import { WebSocket } from "ws"
import handleGetawayMessage from "../../handlers/getaway/handle-message"
import getDiscordWebSocketUrl from "./get-websocket-url"

export default async function runDiscordWebSocket() {
    const socket = new WebSocket(await getDiscordWebSocketUrl())
    socket.onopen = function(event) {
        console.log("websocket opened")
    }
    socket.onerror = console.error
    socket.onclose = function(event) {
        console.log("websocket closed, clean: ", event.wasClean)
    }
    socket.onmessage = handleGetawayMessage
    return
}