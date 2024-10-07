import runDiscordWebSocket from "../src/utils/discord/run-websocket"
import runGithubHookApi from "../src/utils/github/run-webhook-api"

runDiscordWebSocket()
module.exports = runGithubHookApi()
