import { APIMessageComponentButtonInteraction } from "discord-api-types/v10";
import dbUpdateTrackerStatusById from "../../../../../db/update-tracker-status-by-id";
import RegisterStatus from "../../../../../../db/enum/register-status";
import discordReplyToInteractionWithText from "../../../../api/send-plain-text-as-interaction-reply";

export default async function discordHandleRepositoryConfirmationDeny(data: APIMessageComponentButtonInteraction) {
    await dbUpdateTrackerStatusById(data.channel.id, RegisterStatus.Failed)
    await discordReplyToInteractionWithText(data.id, data.token, "Channel registration aborted")
    return
}