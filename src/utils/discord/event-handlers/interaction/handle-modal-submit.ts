import { APIModalSubmitInteraction } from "discord-api-types/v10";
import handleRepositoryTokenSubmit from "./modal-submit/handle-repository-token-submit";
import discordReplyToInteractionWithText from "../../api/send-plain-text-as-interaction-reply";
import RegistrationFailedError from "../../../../error/app/registration-failed.error";
import discordHandleRepositoryTokenSubmit from "./modal-submit/handle-repository-token-submit";

export default async function discordHandleModalSubmitInteraction(data: APIModalSubmitInteraction) {
    switch(data.data.custom_id) {
        case "repository_token_submit": await discordHandleRepositoryTokenSubmit(data); break
    }
    return
}