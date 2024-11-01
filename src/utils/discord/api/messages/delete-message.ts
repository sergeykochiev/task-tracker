import { RESTDeleteAPIChannelMessageResult } from "discord-api-types/v10";
import discordMakeRequest from "../../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../const/discord/api";

export default async function discordDeleteMessage(channelId: string, messageId: string) {
    return await discordMakeRequest<RESTDeleteAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGE(channelId, messageId), { method: 'DELETE' })
}