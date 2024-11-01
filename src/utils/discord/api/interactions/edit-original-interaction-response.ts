import { RESTPatchAPIInteractionOriginalResponseResult, RESTPostAPIInteractionFollowupJSONBody } from 'discord-api-types/v10';
import discordMakeRequest from '../../discord-request';
import { DISCORD_ENDPOINTS } from '../../../../const/discord/api';
import DiscordConfig from '../../../../envcfg/discord.config';

export default async function discordEditOriginalInteractionResponse(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody) {
    return await discordMakeRequest<RESTPatchAPIInteractionOriginalResponseResult>(DISCORD_ENDPOINTS.EDIT_ORIGINAL_INTERACTION_RESPONSE(DiscordConfig.APP_ID, interactionToken), {
        body: message,
        method: "PATCH"
    })
}