import { APIRole } from "discord-api-types/v10";
import RegisterStatus from "../../../../../../db/enum/register-status";
import APIMessageComponentRoleSelectInteraction from "../../../../../../types/discord/api-message-component-role-select-interaction";
import discordReplyToInteractionWithText from "../../../../api/routes/interactions/send-plain-text-as-interaction-reply";
import { databaseUpdateTracker } from "../../../../../db/tracker";
import { databaseSaveRole } from "../../../../../db/role";
import { log } from "console";

export default async function discordHandlePingRoleSelect(data: APIMessageComponentRoleSelectInteraction) {
    const role = (Object.values(data.data.resolved.roles) as APIRole[])[0]
    const saveRoleRes = await databaseSaveRole({
        id: role.id,
        name: role.name
    })
    if (saveRoleRes.err) {
        log(saveRoleRes.err)
        return
    }
    const updateTrackerRes = await databaseUpdateTracker(data.channel.id, {
        role_to_ping: saveRoleRes.data,
        register_status: RegisterStatus.Registered
    })
    if (updateTrackerRes.err) return
    await discordReplyToInteractionWithText(data.id, data.token, "Channel is registered.")
    return
}