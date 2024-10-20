import { APIInteractionResponseCallbackData, InteractionResponseType } from "discord-api-types/v10";
import discordReplyToInteraction from "./reply-to-interaction";

export default async function discordMessageToInteraction(interactionId: string, interactionToken: string, message: APIInteractionResponseCallbackData) {
    return await discordReplyToInteraction(interactionId, interactionToken, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: message
    })
}