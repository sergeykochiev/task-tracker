import { RESTPatchAPIChannelMessageJSONBody, RESTPatchAPIChannelMessageResult } from "discord-api-types/v10";
import discordMakeRequest from "../../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../const/api/discord.api";

export default async function discordEditMessage(channelId: string, messageId: string, newMessage: RESTPatchAPIChannelMessageJSONBody) {
    return await discordMakeRequest<RESTPatchAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGE(channelId, messageId), { method: 'PATCH' })
}