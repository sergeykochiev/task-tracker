import { RESTDeleteAPIChannelMessageResult } from "discord-api-types/v10";
import { DISCORD_ENDPOINTS } from "../../../const/api/discord.api";
import discordMakeRequest from "../../../utils/discord/discord-request";

export default async function discordDeleteMessage(channelId: string, messageId: string) {
    return await discordMakeRequest<RESTDeleteAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGE(channelId, messageId), { method: 'DELETE' })
}