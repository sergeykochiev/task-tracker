import { APIMessage } from "discord-api-types/v10";
import DiscordConst from "../../../../const/discord/discord";
import discordMakeRequest from "../discord-request";

export default async function discordGetMessage(channelId: string, messageId: string): Promise<APIMessage> {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'GET' })
        return await res.json()
    } catch (err) {
        throw err
    }
}