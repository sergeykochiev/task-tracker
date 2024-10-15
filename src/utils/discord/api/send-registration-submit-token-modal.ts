import DISCORD_DEFAULT_REGISTRATION_SUBMIT_TOKEN_MODAL from "../../../const/discord/default-registration-submit-token-modal";
import discordReplyToInteraction from "./reply-to-interaction";
import { InteractionResponseType } from "discord-api-types/v10";

export default async function discordSendRegistrationSubmitTokenModel(interactionId: string, interactionToken: string) {
    return await discordReplyToInteraction(interactionId, interactionToken, {
        type: InteractionResponseType.Modal,
        data: DISCORD_DEFAULT_REGISTRATION_SUBMIT_TOKEN_MODAL
    })
}