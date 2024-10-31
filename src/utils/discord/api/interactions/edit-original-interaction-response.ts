import { RESTPatchAPIInteractionOriginalResponseResult, RESTPostAPIInteractionFollowupJSONBody } from 'discord-api-types/v10';
import DiscordConfig from '../../../../config/env/discord.config';
import { DISCORD_ENDPOINTS } from '../../../../const/api/discord.api';
import discordMakeRequest from '../../discord-request';

export default async function discordEditOriginalInteractionResponse(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody) {
    return await discordMakeRequest<RESTPatchAPIInteractionOriginalResponseResult>(DISCORD_ENDPOINTS.EDIT_ORIGINAL_INTERACTION_RESPONSE(DiscordConfig.APP_ID, interactionToken), {
        body: message,
        method: "PATCH"
    })
}