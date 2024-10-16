import RegisterStatus from "../../../../../../db/enum/register-status";
import APIMessageComponentRoleSelectInteraction from "../../../../../../types/discord/api-message-component-role-select-interaction";
import { dbSaveRole } from "../../../../../db/role";
import { dbUpdateTracker } from "../../../../../db/tracker";
import discordReplyToInteractionWithText from "../../../../api/routes/interactions/send-plain-text-as-interaction-reply";

export default async function discordHandlePingRoleSelect(data: APIMessageComponentRoleSelectInteraction) {
    const role = data.data.resolved.roles[0]
    const targetRole = await dbSaveRole({
        id: role.id,
        name: role.name
    })
    await dbUpdateTracker(data.channel.id, {
        role_to_ping: targetRole,
        register_status: RegisterStatus.Registered
    })
    await discordReplyToInteractionWithText(data.token, data.id, "Channel is registered.")
    return
}