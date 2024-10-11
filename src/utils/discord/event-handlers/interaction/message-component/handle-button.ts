import { APIMessageComponentButtonInteraction } from "discord-api-types/v10";
import discordHandleRepositoryConfirmationDeny from "./button/handle-repository-confirmation-deny";
import discordHandleRepositoryConfirmationConfirm from "./button/handle-repository-confirmation-confirm";

export default async function discordHandleButtonComponent(data: APIMessageComponentButtonInteraction) {
    switch(data.data.custom_id) {
        case "repository_token_alert_confirmation_deny": discordHandleRepositoryConfirmationDeny(data); break
        case "repository_token_alert_confirmation_confirm": discordHandleRepositoryConfirmationConfirm(data); break
    }
    return
}