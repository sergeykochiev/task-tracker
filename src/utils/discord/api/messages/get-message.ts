import { RESTGetAPIChannelMessageResult } from "discord-api-types/v10";
import discordMakeRequest from "../../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../const/api/discord.api";

export default async function discordGetMessage(channelId: string, messageId: string) {
    return await discordMakeRequest<RESTGetAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGE(channelId, messageId), {
        method: 'GET'
    })
}