import { APIGroupDMChannel } from "discord-api-types/v10";
import DiscordConst from "../../../const/discord/discord";
import discordMakeRequest from "./discord-request";

export default async function discordCreateDMChannel(userId: string): Promise<APIGroupDMChannel> {
    const endpoint = DiscordConst.URL.ENDPOINTS.CREATE_DM;
    try {
        const res = await discordMakeRequest(endpoint, { method: 'POST', body: {
            recipient_id: userId
        }})
        return await res.json()
    } catch (err) {
        throw err
    }
}