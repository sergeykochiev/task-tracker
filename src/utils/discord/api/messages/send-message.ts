import { RESTPostAPIChannelMessageJSONBody, RESTPostAPIChannelMessageResult } from 'discord-api-types/v10';
import discordMakeRequest from '../../discord-request';
import { DISCORD_ENDPOINTS } from '../../../../const/discord/api';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody) {
    return await discordMakeRequest<RESTPostAPIChannelMessageResult>(DISCORD_ENDPOINTS.MESSAGES(channelId), { method: 'POST', body: message })
}