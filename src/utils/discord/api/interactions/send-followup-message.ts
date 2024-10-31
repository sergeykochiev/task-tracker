import { RESTPostAPIInteractionFollowupJSONBody, RESTPostAPIInteractionFollowupResult } from 'discord-api-types/v10';
import DiscordConfig from '../../../../config/env/discord.config';
import { DISCORD_ENDPOINTS } from '../../../../const/api/discord.api';
import discordMakeRequest from '../../discord-request';

export default async function discordSendFollowupMessage(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody) {
    return await discordMakeRequest<RESTPostAPIInteractionFollowupResult>(DISCORD_ENDPOINTS.FOLLOWUP_MESSAGE(DiscordConfig.APP_ID, interactionToken), {
        method: 'POST',
        body: message
    })
}