import getDiscordWebSocketUrl from "./api/routes/get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"
import discordHandleCommands from "./event-handlers/interaction/commands"
import githubHandleInteractionMessageComponentRoleSelect from "./event-handlers/interaction/message-component/role-select"
import discordHandleApplicationCommandInteraction from "./event-handlers/interaction/commands"

export default async function discordInitWebsocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl)
    discordWebsocketConnection.onCommand = discordHandleApplicationCommandInteraction
    // discordWebsocketConnection.onMessageCreate = discordHandleMessageCreate
    // discordWebsocketConnection.onMessageComponent = discordHandleMessageComponent
    discordWebsocketConnection.onRoleSelect = githubHandleInteractionMessageComponentRoleSelect
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}