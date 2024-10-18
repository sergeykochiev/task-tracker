import getDiscordWebSocketUrl from "./api/routes/get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket-connection"
import githubHandleInteractionMessageComponentRoleSelect from "./event-handlers/interaction/message-component/role-select"
import discordHandleApplicationCommandInteraction from "./event-handlers/interaction/commands"

export default async function discordInitWebsocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    if (!wssUrl) {
        throw new Error("Can't get websocket url")
    }
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl)
    discordWebsocketConnection.onCommand = discordHandleApplicationCommandInteraction
    discordWebsocketConnection.onRoleSelect = githubHandleInteractionMessageComponentRoleSelect
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}