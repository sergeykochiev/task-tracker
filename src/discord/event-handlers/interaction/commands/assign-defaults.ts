import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import macroAssignDefaults from "../../../../utils/general/macro/assign-defaults";
import discordReplyToInteraction from "../../../../utils/discord/api/interactions/reply-to-interaction";

export default async function discordHandleAssignDefaultsMacroCommand(data: APIApplicationCommandInteraction) {
    const assignRes = await macroAssignDefaults(data.channel.id)
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Default macro settings assigned.`
        }
    })
}