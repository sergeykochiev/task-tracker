import "reflect-metadata"
import discordRunWebSocket from "../src/utils/discord/run-websocket"
import githubRunWebhookApi from "../src/utils/github/run-webhook-api"

discordRunWebSocket()
module.exports = githubRunWebhookApi()
