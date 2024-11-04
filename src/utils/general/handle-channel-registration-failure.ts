import TrackerEntity from "../../db/entity/tracker.entity";
import discordEditOriginalInteractionResponse from "../discord/api/interactions/edit-original-interaction-response";
import discordSendMessageToChannel from "../discord/api/messages/send-message";
import RegisterStatus from "../../enum/register-status";
import { makeDatabaseRequest } from "../../db/repository-request";

export default async function handleChannelRegistrationFailure(channelId: string, reason: string, interactionToken?: string) {
    const getTrackerRes = await makeDatabaseRequest(TrackerEntity, "findOneById", channelId)
    if (getTrackerRes.err) crashTheInstance(getTrackerRes.err)
    if (getTrackerRes.data && getTrackerRes.data.register_status != RegisterStatus.Failed) {
        const updateTrackerRes = await makeDatabaseRequest(TrackerEntity, "update", getTrackerRes.data.discord_channel_id, {
            register_status: RegisterStatus.Failed
        })
        if (updateTrackerRes.err) crashTheInstance(updateTrackerRes.err)
    }
    const failureMessage = `Registration failed, reason: ${reason}`
    const messageRes = interactionToken ? await discordEditOriginalInteractionResponse(interactionToken, {
        content: failureMessage
    }) : await discordSendMessageToChannel(channelId, {
        content: failureMessage
    })
    if (!messageRes.ok) {
        //we simply do not care
    }
    return
}

//crashes the app
function crashTheInstance(e: Error | string) {
    throw new Error(`App crashed as it has reached the bottom of error handling chain with little to no success, cause is: ${e instanceof Error ? e.message : e}`)
}