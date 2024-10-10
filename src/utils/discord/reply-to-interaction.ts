import { APIInteractionResponse, APIModalInteractionResponse } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConst from '../../const/discord/discord';

export default async function discordReplyToInteraction(interactionId: string, interactionToken: string, response: APIInteractionResponse): Promise<void> {
    const endpoint = DiscordConst.URL.ENDPOINTS.INTERACTION_RESPONSE(interactionId, interactionToken);
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: response });
    } catch (err) {
        console.error(err);
    }
}