import { APIApplicationCommandInteraction, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import TrackerEntity from "../../../db/entity/tracker.entity";
import RegisterStatus from "../../../enum/register-status";
import withExistingTracker from "../../../utils/discord/with-existing-tracker-middleware";
import discordTextToInteraction from "../../../utils/discord/text-to-interaction";

async function failRegistration(channelId: string) {
    await TrackerEntity.update(channelId, {
        register_status: RegisterStatus.Failed
    })
}

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log("DISCORD Handling command")
    const interactionData = data.data
    if (interactionData.type !== ApplicationCommandType.ChatInput) return
    const command = interactionData.name
    try {
        switch(command) {
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
        console.log("DISCORD error handling", command, "command :", e)
        await discordTextToInteraction(data.id, data.token, {
            content: `Error handling ${command} command: ${e}`
        })
    }
    return
}