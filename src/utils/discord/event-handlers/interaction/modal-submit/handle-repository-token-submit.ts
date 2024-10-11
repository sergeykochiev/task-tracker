import { APIModalSubmitInteraction } from "discord-api-types/v10"
import dbUpdateTrackerStatusById from "../../../../db/update-tracker-status-by-id"
import RegistrationFailedError from "../../../../../error/app/registration-failed.error"
import dbGetTrackerByRegistrarId from "../../../../db/get-trackers-by-registrar-id"
import RegisterStatus from "../../../../../db/enum/register-status"
import discordHandleRegistrationAddToken from "../../../handle-registration-add-token"
import discordSendTextMessage from "../../../helpers/send-plain-text-as-message"
import discordSendFollowupTextMessage from "../../../helpers/send-plain-text-as-followup-message"
import discordReplyToInteractionWithText from "../../../helpers/send-plain-text-as-interaction-reply"

export default async function handleRepositoryTokenSubmit(data: APIModalSubmitInteraction) {
    const targetTracker = await dbGetTrackerByRegistrarId(data.member!.user.id)
    if (!targetTracker || targetTracker.register_status != RegisterStatus.PendingToken) return
    try {
        await discordHandleRegistrationAddToken(data, targetTracker)
        await dbUpdateTrackerStatusById(targetTracker.discord_channel_id, RegisterStatus.Registered)
        await discordReplyToInteractionWithText(data.id, data.token, "Registration complete!")
        await discordSendTextMessage(targetTracker.discord_channel_id, "Registration complete! Issues are going to flow in, starting now.")
    } catch(e) {
        if (e instanceof RegistrationFailedError) {
            await dbUpdateTrackerStatusById(targetTracker.discord_channel_id, RegisterStatus.Failed)
            discordReplyToInteractionWithText(data.id, data.token, `Registration failed: ${e.getReason()}`)
            return
        }
        return
    }
    return
}