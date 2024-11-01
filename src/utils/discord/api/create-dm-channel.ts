import { RESTPostAPICurrentUserCreateDMChannelResult } from "discord-api-types/v10";
import discordMakeRequest from "../discord-request";
import { DISCORD_ENDPOINTS } from "../../../const/discord/api";

export default async function discordCreateDMChannel(userId: string) {
    return await discordMakeRequest<RESTPostAPICurrentUserCreateDMChannelResult>(DISCORD_ENDPOINTS.CREATE_DM, {
        method: 'POST',
        body: {
            recipient_id: userId
        }
    })
}