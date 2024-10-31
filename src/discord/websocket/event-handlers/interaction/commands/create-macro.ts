import { log } from "console";
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import TrackerEntity from "../../../../../db/entity/tracker.entity";
import RegisterStatus from "../../../../../db/enum/register-status";
import { makeDatabaseRequest } from "../../../../../utils/db/repository-request";
import discordMessageToInteraction from "../../../../../utils/discord/api/messages/reply-channel-message-with-source";
import discordReplyToInteraction from "../../../../../utils/discord/api/interactions/reply-to-interaction";
import macroGetOneTimeLink from "../../../../../utils/general/macro/get-one-time-link";
import { addMacroRequest } from "../../../../../utils/general/validate-macro-request";

export default async function discordHandleCreateMacroCommand(data: APIApplicationCommandInteraction) {
    const getTrackerRes = await makeDatabaseRequest(TrackerEntity, "findOneById", data.channel.id)
    if (getTrackerRes.err) {
        log(getTrackerRes.err)
        return
    }
    const targetTracker = getTrackerRes.data
    if(!targetTracker || targetTracker.register_status != RegisterStatus.Registered) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Complete the channel registration first."
        })
        return
    }
    const uuid = addMacroRequest(data.channel.id)
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Sure! Generated you a one-time [link](<${macroGetOneTimeLink(uuid)}>)`
        }
    })
    return
}