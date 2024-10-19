import { APIRole } from "discord-api-types/v10";
import RegisterStatus from "../../../../../../db/enum/register-status";
import APIMessageComponentRoleSelectInteraction from "../../../../../../types/discord/api-message-component-role-select-interaction";
import { databaseGetTrackerById, databaseUpdateTracker } from "../../../../../db/tracker";
import { databaseSaveRole } from "../../../../../db/role";
import { log } from "console";
import discordMessageToInteraction from "../../../../api/routes/interactions/reply/reply-channel-message-with-source";
import handleChannelRegistrationFailure from "../../../../../general/handle-channel-registration-failure";
import discordSendMessageToChannel from "../../../../api/routes/messages/send-message";

export default async function discordHandlePingRoleSelect(data: APIMessageComponentRoleSelectInteraction) {
    const targetChannelId = data.channel.id
    const getTrackerRes = await databaseGetTrackerById(targetChannelId)
    if (getTrackerRes.err) {
        handleChannelRegistrationFailure(targetChannelId, "Coulnd't setup role")
        log(getTrackerRes.err)
        return
    }
    if (!getTrackerRes.data || getTrackerRes.data.register_status != RegisterStatus.PendingRole) {
        const replyRes = await discordMessageToInteraction(data.id, data.token, {
            content: "Channel is registered."
        })
        if (!replyRes.err && !replyRes.data.ok) {
            await discordSendMessageToChannel(targetChannelId, {
                content: "Invalid operation."
            })
        }
    }
    const role = (Object.values(data.data.resolved.roles) as APIRole[])[0]
    const saveRoleRes = await databaseSaveRole({
        id: role.id,
        name: role.name
    })
    if (saveRoleRes.err) {
        handleChannelRegistrationFailure(targetChannelId, "Couldn't setup role")
        log(saveRoleRes.err)
        return
    }
    const updateTrackerRes = await databaseUpdateTracker(targetChannelId, {
        role_to_ping: saveRoleRes.data,
        register_status: RegisterStatus.Registered
    })
    if (updateTrackerRes.err) {
        handleChannelRegistrationFailure(targetChannelId, "Couldn't setup role")
        log(updateTrackerRes.err)
        return
    }
    await discordMessageToInteraction(data.id, data.token, {
        content: "Channel is registered."
    })
    return
}