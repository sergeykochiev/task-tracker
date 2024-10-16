import { APIGroupDMChannel } from "discord-api-types/v10";
import discordMakeRequest from "../discord-request";
import { DISCORD_ENDPOINTS } from "../../../../const/api/discord.api";

export default async function discordCreateDMChannel(userId: string): Promise<APIGroupDMChannel> {
    return await (await discordMakeRequest(DISCORD_ENDPOINTS.CREATE_DM, { method: 'POST', body: {
        recipient_id: userId
    }})).json()
}