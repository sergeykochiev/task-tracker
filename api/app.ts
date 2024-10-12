import "reflect-metadata"
import discordOpenAndInitWebSocket from "../src/utils/discord/open-and-init-websocket"
import githubRunWebhookApi from "../src/utils/github/run-webhook-api"

const discordWebsocketConnection = discordOpenAndInitWebSocket()

githubRunWebhookApi()

export { discordWebsocketConnection }
