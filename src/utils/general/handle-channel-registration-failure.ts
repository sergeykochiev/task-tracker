import RegisterStatus from "../../db/enum/register-status";
import { databaseGetTrackerById, databaseUpdateTrackerStatus } from "../db/tracker";
import discordEditOriginalInteractionResponse from "../discord/api/routes/interactions/edit-original-interaction-response";
import discordSendMessageToChannel from "../discord/api/routes/messages/send-message";

export default async function handleChannelRegistrationFailure(channelId: string, reason: string, interactionToken?: string) {
    const getTrackerRes = await databaseGetTrackerById(channelId)
    if (getTrackerRes.err) crashTheInstance(getTrackerRes.err)
    if (getTrackerRes.data && getTrackerRes.data.register_status != RegisterStatus.Failed) {
        const updateTrackerRes = await databaseUpdateTrackerStatus(getTrackerRes.data.discord_channel_id, RegisterStatus.Failed)
        if (updateTrackerRes.err) crashTheInstance(updateTrackerRes.err)
    }
    const failureMessage = `Registration failed, reason: ${reason}`
    const messageRes = interactionToken ? await discordEditOriginalInteractionResponse(interactionToken, {
        content: failureMessage
    }) : await discordSendMessageToChannel(channelId, {
        content: failureMessage
    })
    if (messageRes.err) {
        //we simply do not care
    }
    return
}

//crashes the app
function crashTheInstance(e: Error) {
    throw new Error(`App crashed as it has reached the bottom of error handling chain with little to no success, cause is: ${e.message}`)
}