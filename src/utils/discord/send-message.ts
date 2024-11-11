import { RESTPostAPIChannelMessageJSONBody, RESTPostAPIChannelMessageResult } from 'discord-api-types/v10';
import { DISCORD_V10_API_ROOT, DISCORD_ENDPOINTS, DISCORD_AUTH_HEADERS } from '../../const/discord/api';
import TypedResponse from '../../types/typed-response';

export default async function discordSendMessageToChannel(channelId: string | number, message: RESTPostAPIChannelMessageJSONBody): Promise<TypedResponse<RESTPostAPIChannelMessageResult>> {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.MESSAGES(channelId), {
        method: 'POST',
        body: JSON.stringify(message),
        headers: DISCORD_AUTH_HEADERS
    })
}