import { RESTPostAPIInteractionFollowupJSONBody, RESTPostAPIInteractionFollowupResult } from 'discord-api-types/v10';
import discordMakeRequest from '../../discord-request';
import { DISCORD_ENDPOINTS } from '../../../../const/discord/api';
import DiscordConfig from '../../../../envcfg/discord.config';

export default async function discordSendFollowupMessage(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody) {
    return await discordMakeRequest<RESTPostAPIInteractionFollowupResult>(DISCORD_ENDPOINTS.FOLLOWUP_MESSAGE(DiscordConfig.APP_ID, interactionToken), {
        method: 'POST',
        body: message
    })
}