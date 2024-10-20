import getDiscordWebSocketUrl from "../../discord/api/get-websocket-url"
import DiscordWebsocketConnection from "../../discord/websocket/websocket-connection"
import githubHandleInteractionMessageComponentRoleSelect from "../../discord/websocket/event-handlers/interaction/message-component/role-select"
import discordHandleApplicationCommandInteraction from "../../discord/websocket/event-handlers/interaction/commands"
import discordInstallGlobalCommands from "../../discord/api/install-global-commands"
import DiscordConfig from "../../config/env/discord.config"
import ALL_COMMANDS from "../../const/discord/global-commands"

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
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl)
    discordWebsocketConnection.onCommand = discordHandleApplicationCommandInteraction
    discordWebsocketConnection.onRoleSelect = githubHandleInteractionMessageComponentRoleSelect
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}