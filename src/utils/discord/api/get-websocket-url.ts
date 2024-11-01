import { RESTGetAPIGatewayResult } from "discord-api-types/v10"
import discordMakeRequest from "../discord-request"
import { DISCORD_ENDPOINTS } from "../../../const/discord/api"

export default async function discordGetWebSocketUrl() {
    const res = await discordMakeRequest<RESTGetAPIGatewayResult>(DISCORD_ENDPOINTS.GATEWAY)
    if (res.err !== null || !res.data.ok) return null
    return res.data.data.url
}