import { APIApplicationCommandInteraction, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import TrackerEntity from "../../../db/entity/tracker.entity";
import RegisterStatus from "../../../enum/register-status";
import discordReplyToInteraction from "../../../utils/discord/api/interactions/reply-to-interaction";
import withExistingTracker from "../../../utils/discord/with-existing-tracker-middleware";

async function failRegistration(channelId: string) {
    await TrackerEntity.update(channelId, {
        register_status: RegisterStatus.Failed
    })
}

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log("Handling command")
    const interactionData = data.data
    if (interactionData.type !== ApplicationCommandType.ChatInput) return
    try {
        switch(interactionData.name) {
            case "register": {
                try {
                    await discordHandleRegisterCommand(data)
                } catch(e) {
                    await failRegistration(data.channel.id)
                    throw e
                }
                break
            }
            case "unregister": await withExistingTracker(data, discordHandleUnregisterCommand); break
        }
    } catch(e) {
        console.log(e)
        await discordReplyToInteraction(data.id, data.token, {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `Error handling ${interactionData.name} command: ${e}`
            }
        })
    }
    return
}