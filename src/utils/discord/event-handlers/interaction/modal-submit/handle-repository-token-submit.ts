import { APIModalSubmitInteraction } from "discord-api-types/v10"
import RegistrationFailedError from "../../../../../error/app/registration-failed.error"
import discordReplyToInteractionWithText from "../../../api/send-plain-text-as-interaction-reply"
import handleChannelRegistrationPendingToken from "../../../../general/handle-channel-registration-pending-token"

export default async function discordHandleRepositoryTokenSubmit(data: APIModalSubmitInteraction) {
    try {
        await handleChannelRegistrationPendingToken(data)
        await discordReplyToInteractionWithText(data.id, data.token, "Registration complete!")
        return
    } catch(e) {
        if (e instanceof RegistrationFailedError) {
            await discordReplyToInteractionWithText(data.id, data.token, `Registration failed: ${e.getReason()}`)
            return
        }
        await discordReplyToInteractionWithText(data.id, data.token, `Registration failed: ${String(e)}`)
        return
    }
}