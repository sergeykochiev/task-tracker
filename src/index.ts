import "reflect-metadata"
import githubInitWebhookApi from "./utils/github/init-webhook-api"
import discordInitWebsocket from "./utils/discord/init-websocket"

discordInitWebsocket()
githubInitWebhookApi()