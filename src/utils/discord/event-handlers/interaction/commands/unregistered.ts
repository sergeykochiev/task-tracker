import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10";
import discordReplyToInteractionWithText from "../../../api/routes/interactions/send-plain-text-as-interaction-reply";
import { databaseDeleteTracker, databaseGetTrackerById } from "../../../../db/tracker";
import { log } from "console";
import RegisterStatus from "../../../../../db/enum/register-status";
import discordSendMessageToChannel from "../../../api/routes/messages/send-message";

export default async function discordHandleUnregisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordReplyToInteractionWithText(data.id, data.token, "This command can only be used inside a server")
        return
    }
    const getTrackerRes = await databaseGetTrackerById(data.channel.id)
    if (getTrackerRes.err) {
        log(getTrackerRes.err)
        return
    }
    const targetTracker = getTrackerRes.data
    if(!targetTracker || targetTracker.register_status != RegisterStatus.Registered) {
        await discordReplyToInteractionWithText(data.id, data.token, "Channel is not registered. To register, user /register command with the repository you want to link this chat to.")
        return
    }
    const deleteChannelRes = await databaseDeleteTracker(targetTracker.discord_channel_id)
    if (deleteChannelRes.err) {
        log(deleteChannelRes.err)
        await discordSendMessageToChannel(targetTracker.discord_channel_id, {
            content: "Coundn't unregister the channel."
        })
        return
    }
    await discordSendMessageToChannel(targetTracker.discord_channel_id, {
        content: "Channel unregistered."
    })
    return
}