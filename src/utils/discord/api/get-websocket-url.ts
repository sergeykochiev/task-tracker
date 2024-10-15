import { DISCORD_ENDPOINTS } from "../../../const/api/discord.api"
import discordMakeRequest from "./discord-request"

export default async function discordGetWebSocketUrl() {
    const getawayEndpointRes = await discordMakeRequest(DISCORD_ENDPOINTS.GETAWAY)
    const json = await getawayEndpointRes.json()
    const wssUrl: string = json.url
    if (!wssUrl) {
        console.error("No url found in response, here it is: ", json)
    }
    return wssUrl
}