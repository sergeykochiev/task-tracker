import { RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/v10';
import DiscordConst from '../../const/discord';
import DiscordRequest from './discord-request';

export default async function sendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody): Promise<void> {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGES(channelId);
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: message });
    } catch (err) {
        console.error(err);
    }
}