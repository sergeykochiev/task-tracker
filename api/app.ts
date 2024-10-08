import runDiscordWebSocket from "../src/utils/discord/run-websocket"
import runGithubHookApi from "../src/utils/github/run-webhook-api"
import "reflect-metadata"

runDiscordWebSocket()
module.exports = runGithubHookApi()
