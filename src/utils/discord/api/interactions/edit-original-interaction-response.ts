import { RESTPatchAPIInteractionOriginalResponseResult, RESTPostAPIInteractionFollowupJSONBody } from 'discord-api-types/v10';
import { DISCORD_AUTH_HEADERS, DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from '../../../../const/discord/api';
import DiscordConfig from '../../../../envcfg/discord.config';
import TypedResponse from '../../../../types/typed-response';

export default async function discordEditOriginalInteractionResponse(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody): Promise<TypedResponse<RESTPatchAPIInteractionOriginalResponseResult>> {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.EDIT_ORIGINAL_INTERACTION_RESPONSE(DiscordConfig.APP_ID, interactionToken), {
        body: JSON.stringify(message),
        method: "PATCH",
        headers: DISCORD_AUTH_HEADERS
    })
}