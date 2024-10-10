import { RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConst from '../../const/discord/discord';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody): Promise<void> {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGES(channelId);
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: message });
    } catch (err) {
        console.error(err);
    }
}