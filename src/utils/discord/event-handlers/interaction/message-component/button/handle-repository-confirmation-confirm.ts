import { APIMessageComponentButtonInteraction } from "discord-api-types/v10";
import discordSendRegistrationSubmitTokenModel from "../../../../helpers/send-registration-submit-token-modal";

export default async function discordHandleRepositoryConfirmationConfirm(data: APIMessageComponentButtonInteraction) {
    await discordSendRegistrationSubmitTokenModel(data.id, data.token)
    return
}