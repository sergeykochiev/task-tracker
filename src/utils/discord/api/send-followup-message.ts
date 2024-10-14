import { RESTPostAPIInteractionFollowupJSONBody } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConfig from '../../../config/env/discord.config';
import { DISCORD_ENDPOINTS } from '../../../const/api/discord.api';

export default async function discordSendFollowupMessage(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody): Promise<void> {
    return await (await DiscordRequest(DISCORD_ENDPOINTS.FOLLOWUP_MESSAGE(DiscordConfig.APP_ID, interactionToken), { method: 'POST', body: message })).json()
}