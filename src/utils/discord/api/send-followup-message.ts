import { RESTPostAPIInteractionFollowupJSONBody } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConst from '../../../const/discord/discord';
import DiscordConfig from '../../../config/env/discord.config';

export default async function discordSendFollowupMessage(interactionToken: string, message: RESTPostAPIInteractionFollowupJSONBody): Promise<void> {
    const endpoint = DiscordConst.URL.ENDPOINTS.FOLLOWUP_MESSAGE(DiscordConfig.APP_ID, interactionToken);
    try {
        const res = await DiscordRequest(endpoint, { method: 'POST', body: message });
        return await res.json()
    } catch (err) {
        throw err
    }
}