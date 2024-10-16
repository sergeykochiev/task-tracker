import { APIInteractionResponse } from 'discord-api-types/v10';
import DiscordRequest from '../../discord-request';
import { DISCORD_ENDPOINTS } from '../../../../../const/api/discord.api';

export default async function discordReplyToInteraction(interactionId: string, interactionToken: string, reply: APIInteractionResponse): Promise<void> {
    return await (await DiscordRequest(DISCORD_ENDPOINTS.INTERACTION_RESPONSE(interactionId, interactionToken), { method: 'POST', body: reply })).json()
}