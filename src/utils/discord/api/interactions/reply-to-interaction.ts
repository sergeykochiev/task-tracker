import { APIInteractionResponse, RESTPostAPIInteractionCallbackResult } from 'discord-api-types/v10';
import { DISCORD_ENDPOINTS } from '../../../../const/api/discord.api';
import discordMakeRequest from '../../discord-request';

export default async function discordReplyToInteraction(interactionId: string, interactionToken: string, reply: APIInteractionResponse) {
    return await discordMakeRequest<RESTPostAPIInteractionCallbackResult>(DISCORD_ENDPOINTS.INTERACTION_RESPONSE(interactionId, interactionToken), {
        method: 'POST',
        body: reply
    })
}