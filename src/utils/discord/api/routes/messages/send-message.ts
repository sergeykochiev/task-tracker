import { RESTPostAPIChannelMessageJSONBody, RESTPostAPIChannelMessageResult } from 'discord-api-types/v10';
import { DISCORD_ENDPOINTS } from '../../../../../const/api/discord.api';
import discordMakeRequest from '../../discord-request';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody) {
    return await discordMakeRequest<RESTPostAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGES(channelId), { method: 'POST', body: message })
}