import { InteractionResponseType } from "discord-api-types/v10";
import discordReplyToInteraction from "./reply-to-interaction";

export default async function discordReplyToInteractionWithText(interactionId: string, interactionToken: string, message: string) {
    return await discordReplyToInteraction(interactionId, interactionToken, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: message
        }
    })
}