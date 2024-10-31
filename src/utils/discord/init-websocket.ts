import getDiscordWebSocketUrl from "./api/get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket/websocket-connection"
import discordHandleGatewayEvent from "../../discord/websocket/event-handlers"

export default async function discordInitWebsocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    if (!wssUrl) {
        throw new Error("Can't get websocket url")
    }
    // const a = await discordInstallGlobalCommands(DiscordConfig.APP_ID, ALL_COMMANDS)
    // if (!a.err && !a.data.ok) {
    //     console.error(JSON.stringify(a.data.data))
    //     throw null
    // }
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl, true)
    discordWebsocketConnection.onEvent = discordHandleGatewayEvent
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}