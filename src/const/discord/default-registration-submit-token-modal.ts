import { APIModalInteractionResponseCallbackData, ComponentType, TextInputStyle } from "discord-api-types/v10";

const DISCORD_DEFAULT_REGISTRATION_SUBMIT_TOKEN_MODAL: APIModalInteractionResponseCallbackData = {
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

export default DISCORD_DEFAULT_REGISTRATION_SUBMIT_TOKEN_MODAL