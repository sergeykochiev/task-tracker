import getDiscordWebSocketUrl from "./api/routes/get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"
import githubHandleInteractionMessageComponentRoleSelect from "./event-handlers/interaction/message-component/role-select"
import discordHandleApplicationCommandInteraction from "./event-handlers/interaction/commands"

export default async function discordInitWebsocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl)
    discordWebsocketConnection.onCommand = discordHandleApplicationCommandInteraction
    discordWebsocketConnection.onRoleSelect = githubHandleInteractionMessageComponentRoleSelect
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}