import { DISCORD_ENDPOINTS } from "../../../../../const/api/discord.api";
import discordMakeRequest from "../../discord-request";

export default async function discordDeleteMessage(channelId: string, messageId: string) {
    const endpoint = DISCORD_ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'DELETE' })
        return await res.json()
    } catch (err) {
        throw err
    }
}