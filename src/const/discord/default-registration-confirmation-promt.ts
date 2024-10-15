import { APIInteractionResponseCallbackData, ButtonStyle, ComponentType } from "discord-api-types/v10";

const DISCORD_DEFAULT_REGISTRATION_CONFIRMATION_PROMT: APIInteractionResponseCallbackData = {
    content: "In order for the bot to track things that happen in your repository you need to create and provide a fine-granted access token with the following permissions: \n\n- Webhooks (Read and Write)\n\nMake sure to select your repository in \"Repository access\" section beforehand. While we encrypt your tokens before saving them, it's recommended to select only those permissions and only one repository that you want to track events from in order to maintain security.\n",
    components: [
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    type: ComponentType.Button,
                    custom_id: `repository_token_alert_confirmation_deny`,
                    label: "Wait, this was not part of my plans! (Abort)",
                    style: ButtonStyle.Danger
                },
                {
                    type: ComponentType.Button,
                    custom_id: `repository_token_alert_confirmation_confirm`,
                    label: "Submit",
                    style: ButtonStyle.Primary
                }
            ]
        }
    ]            
}

export default DISCORD_DEFAULT_REGISTRATION_CONFIRMATION_PROMT