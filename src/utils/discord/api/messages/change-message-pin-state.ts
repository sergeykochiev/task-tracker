import { DISCORD_ENDPOINTS } from "../../../../const/api/discord.api";
import discordMakeRequest from "../../discord-request";

export default async function discordChangeMessagePinState(channelId: string, messageId: string, pin: true) {
    return await discordMakeRequest(DISCORD_ENDPOINTS.PIN_MESSAGE(channelId, messageId), {
        method: pin ? "PUT" : "DELETE"
    })
}