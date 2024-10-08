import getDiscordWebSocketUrl from "./get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"

export default async function runDiscordWebSocket() {
    const socketConnection = new DiscordWebsocketConnection(await getDiscordWebSocketUrl())
    socketConnection.openAndInit()
    return
}