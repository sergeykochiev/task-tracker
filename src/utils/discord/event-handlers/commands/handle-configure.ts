import discordReplyToInteraction from "../../reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "register command"
        }
    })
    return
}