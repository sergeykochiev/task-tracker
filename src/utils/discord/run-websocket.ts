import { WebSocket } from "ws"
import getDiscordWebSocketUrl from "./get-websocket-url"
import handleDiscordGetawayMessage from "../../handlers/discord/websocket/handle-message"

export default async function runDiscordWebSocket() {
    const socket = new WebSocket(await getDiscordWebSocketUrl())
    socket.onopen = function(event) {
        console.log("websocket opened")
    }
    socket.onerror = console.error
    socket.onclose = function(event) {
        console.log("websocket closed, clean: ", event.wasClean)
    }
    socket.onmessage = handleDiscordGetawayMessage
    return
}