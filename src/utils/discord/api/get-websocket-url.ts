import { DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from "../../../const/discord/api"

export default async function discordGetWebSocketUrl() {
    const res = await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.GATEWAY)
    if (!res.ok) return null
    // console.log(await res.json())
    return (await res.json()).url
}