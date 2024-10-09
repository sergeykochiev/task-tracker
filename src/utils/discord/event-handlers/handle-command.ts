import replyToInteraction from "../reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"

export default async function handleCommands(data: APIApplicationCommandInteraction): Promise<void> {
    switch(data.data.name) {
        case "register": {
            replyToInteraction(data.id, data.token, {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: "register command"
                }
            })
            break
        }
        case "configure": {
            replyToInteraction(data.id, data.token, {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: "configure command"
                }
            })
            break
        }
    }
    return
}