import discordReplyToInteraction from "../../reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"

export default async function discordHandleConfigureCommand(data: APIApplicationCommandInteraction) {
    discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "configure command"
        }
    })
    return
}