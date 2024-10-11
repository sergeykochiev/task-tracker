import discordReplyToInteraction from "./reply-to-interaction";
import { ComponentType, InteractionResponseType, TextInputStyle } from "discord-api-types/v10";

export default async function discordSendRegistrationSubmitTokenModel(interactionId: string, interactionToken: string) {
    return await discordReplyToInteraction(interactionId, interactionToken, {
        type: InteractionResponseType.Modal,
        data: {
            title: "Submit the Github token",
            custom_id: `repository_token_submit`,
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.TextInput,
                            custom_id: `repository_token_submit`,
                            style: TextInputStyle.Short,
                            label: "Your Github fine-granted access token"
                        }
                    ]
                }
            ]
        }
    })
}