import DiscordConst from "../../../const/discord/discord"
import DiscordRequest from "./discord-request"

export default async function discordGetWebSocketUrl() {
    const getawayEndpointRes = await DiscordRequest(DiscordConst.URL.ENDPOINTS.GETAWAY, {
        method: "GET"
    })
    const json = await getawayEndpointRes.json()
    const wssUrl: string = json.url
    if (!wssUrl) {
        console.error("No url found in response, here it is: ", json)
    }
    return wssUrl
}