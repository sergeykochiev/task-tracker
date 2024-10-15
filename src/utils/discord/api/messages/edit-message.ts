import { RESTPatchAPIChannelMessageJSONBody } from "discord-api-types/v10";
import DiscordConst from "../../../../const/discord/discord";
import discordMakeRequest from "../discord-request";

export default async function discordEditMessage(channelId: string, messageId: string, newMessage: RESTPatchAPIChannelMessageJSONBody) {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'PATCH' })
        return await res.json()
    } catch (err) {
        throw err
    }
}