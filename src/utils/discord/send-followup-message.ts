import { RESTPatchAPIWebhookWithTokenMessageJSONBody } from 'discord-api-types/v10';
import DiscordRequest from './discord-request';
import DiscordConst from '../../const/discord/discord';

export default async function sendFollowupMessage(appId: string | number, interactionToken: string, message: RESTPatchAPIWebhookWithTokenMessageJSONBody): Promise<void> {
    const endpoint = DiscordConst.URL.ENDPOINTS.FOLLOWUP_MESSAGE(appId, interactionToken);
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: message });
    } catch (err) {
        console.error(err);
    }
}