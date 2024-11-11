import { APIInteractionResponseCallbackData, InteractionResponseType } from "discord-api-types/v10";
import { DISCORD_V10_API_ROOT, DISCORD_ENDPOINTS, DISCORD_AUTH_HEADERS } from "../../const/discord/api";

export default async function discordTextToInteraction(interactionId: string, interactionToken: string, message: APIInteractionResponseCallbackData) {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.INTERACTION_RESPONSE(interactionId, interactionToken), {
        method: 'POST',
        body: JSON.stringify({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: message
        }),
        headers: DISCORD_AUTH_HEADERS
    })
}