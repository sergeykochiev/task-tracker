import { APIMessage, RESTPostAPIChannelMessageJSONBody } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConst from '../../../const/discord/discord';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody): Promise<APIMessage> {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGES(channelId);
    try {
        const res = await DiscordRequest(endpoint, { method: 'POST', body: message });
        return await res.json()
    } catch (err) {
        throw err
    }
}

// discordSendMessageToChannel("1292208485555245175", {
//     content: "dupa"
// })