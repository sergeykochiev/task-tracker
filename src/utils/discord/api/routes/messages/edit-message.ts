import { RESTPatchAPIChannelMessageJSONBody } from "discord-api-types/v10";
import discordMakeRequest from "../../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../../const/api/discord.api";

export default async function discordEditMessage(channelId: string, messageId: string, newMessage: RESTPatchAPIChannelMessageJSONBody) {
    const endpoint = DISCORD_ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'PATCH' })
        return await res.json()
    } catch (err) {
        throw err
    }
}