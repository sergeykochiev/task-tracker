import getDiscordWebSocketUrl from "./get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"
import handleCommands from "./event-handlers/handle-command"

export default async function discordRunWebSocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    const socketConnection = new DiscordWebsocketConnection(wssUrl)
    socketConnection.onCommand = handleCommands
    socketConnection.openAndInit()
    return
}