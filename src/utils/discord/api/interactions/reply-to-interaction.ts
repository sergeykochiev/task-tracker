import { APIInteractionResponse, RESTPostAPIInteractionCallbackResult } from 'discord-api-types/v10';
import { DISCORD_AUTH_HEADERS, DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from '../../../../const/discord/api';
import TypedResponse from '../../../../types/typed-response';

export default async function discordReplyToInteraction(interactionId: string, interactionToken: string, reply: APIInteractionResponse): Promise<TypedResponse<RESTPostAPIInteractionCallbackResult>> {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.INTERACTION_RESPONSE(interactionId, interactionToken), {
        method: 'POST',
        body: JSON.stringify(reply),
        headers: DISCORD_AUTH_HEADERS
    })
}