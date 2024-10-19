import { APIApplicationCommandInteraction, InteractionContextType, InteractionResponseType } from "discord-api-types/v10";
import { databaseDeleteTracker, databaseGetTrackerById } from "../../../../db/tracker";
import { log } from "console";
import RegisterStatus from "../../../../../db/enum/register-status";
import discordMessageToInteraction from "../../../api/routes/interactions/reply/reply-channel-message-with-source";

export default async function discordHandleUnregisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "This command can only be used inside a server"
        })
        return
    }
    const getTrackerRes = await databaseGetTrackerById(data.channel.id)
    if (getTrackerRes.err) {
        log(getTrackerRes.err)
        return
    }
    const targetTracker = getTrackerRes.data
    if(!targetTracker || targetTracker.register_status != RegisterStatus.Registered) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Channel is not registered. To register, use /register command with the repository you want to link this chat to."
        })
        return
    }
    const deleteChannelRes = await databaseDeleteTracker(targetTracker.discord_channel_id)
    if (deleteChannelRes.err) {
        log(deleteChannelRes.err)
        await discordMessageToInteraction(data.id, data.token, {
            content: "Coundn't unregister the channel."
        })
        return
    }
    await discordMessageToInteraction(data.id, data.token, {
        content: "Channel unregistered."
    })
    return
}