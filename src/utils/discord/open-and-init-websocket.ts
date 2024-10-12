<<<<<<< HEAD
import getDiscordWebSocketUrl from "./api/get-websocket-url"
=======
import getDiscordWebSocketUrl from "./helpers/get-websocket-url"
>>>>>>> d4af1e04dd7ba2ca32181e9c8d8acd9b69838ce0
import DiscordWebsocketConnection from "../../discord/websocket-connection"
import discordHandleMessageCreate from "./event-handlers/handle-message-create"
import discordHandleCommands from "./event-handlers/interaction/handle-application-command"
import discordHandleModalSubmit from "./event-handlers/interaction/handle-modal-submit"
import discordHandleButtonComponent from "./event-handlers/interaction/message-component/handle-button"

export default async function discordOpenAndInitWebSocket() {
    const wssUrl = await getDiscordWebSocketUrl()
    const discordWebsocketConnection = new DiscordWebsocketConnection(wssUrl)
    discordWebsocketConnection.onCommand = discordHandleCommands
    discordWebsocketConnection.onMessageCreate = discordHandleMessageCreate
    // discordWebsocketConnection.onMessageComponent = discordHandleMessageComponent
    discordWebsocketConnection.onModalSubmit = discordHandleModalSubmit
    discordWebsocketConnection.onButtonComponent = discordHandleButtonComponent
    discordWebsocketConnection.openAndInit()
    return discordWebsocketConnection
}