import DiscordConst from "../../../../const/discord/discord";
import discordMakeRequest from "../discord-request";

export default async function discordDeleteMessage(channelId: string, messageId: string) {
    const endpoint = DiscordConst.URL.ENDPOINTS.MESSAGE(channelId, messageId);
    try {
        const res = await discordMakeRequest(endpoint, { method: 'DELETE' })
        return await res.json()
    } catch (err) {
        throw err
    }
}