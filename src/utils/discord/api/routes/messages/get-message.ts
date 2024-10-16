import { APIMessage } from "discord-api-types/v10";
import discordMakeRequest from "../../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../../const/api/discord.api";

export default async function discordGetMessage(channelId: string, messageId: string): Promise<APIMessage> {
    const endpoint = DISCORD_ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'GET' })
        return await res.json()
    } catch (err) {
        throw err
    }
}