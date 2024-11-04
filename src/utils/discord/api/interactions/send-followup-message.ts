import { RESTPostAPIInteractionFollowupJSONBody, RESTPostAPIInteractionFollowupResult } from 'discord-api-types/v10';
import { DISCORD_AUTH_HEADERS, DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from '../../../../const/discord/api';
import DiscordConfig from '../../../../envcfg/discord.config';
import TypedResponse from '../../../../types/typed-response';

export default async function discordSendFollowupMessage(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody): Promise<TypedResponse<RESTPostAPIInteractionFollowupResult>> {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.FOLLOWUP_MESSAGE(DiscordConfig.APP_ID, interactionToken), {
        method: 'POST',
        body: JSON.stringify(message),
        headers: DISCORD_AUTH_HEADERS
    })
}