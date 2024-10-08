import getDiscordWebSocketUrl from "./get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"

export default async function runDiscordWebSocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    const socketConnection = new DiscordWebsocketConnection(wssUrl)
    socketConnection.openAndInit()
    return
}