import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import discordReplyToInteraction from "../../../../utils/discord/api/interactions/reply-to-interaction";
import macroGetOneTimeLink from "../../../../utils/general/macro/get-one-time-link";
import { addMacroRequest } from "../../../../utils/general/validate-macro-request";
import macroGetCurrentCountForTracker from "../../../../utils/general/macro/get-current-count-for-tracker";

export default async function discordHandleCreateMacroCommand(data: APIApplicationCommandInteraction) {
    const count = await macroGetCurrentCountForTracker(data.channel.id)
    if(count >= 10) throw "Macro limit exceeded"
    const uuid = addMacroRequest(data.channel.id)
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Sure! Generated you a one-time [link](<${macroGetOneTimeLink(uuid)}>)`
        }
    })
    return
}