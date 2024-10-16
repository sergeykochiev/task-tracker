import { APIMessage, RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/v10';
import DiscordRequest from '../../discord-request';
import { DISCORD_ENDPOINTS } from '../../../../../const/api/discord.api';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody): Promise<APIMessage> {
    return await (await DiscordRequest(DISCORD_ENDPOINTS.MESSAGES(channelId), { method: 'POST', body: message })).json()
}