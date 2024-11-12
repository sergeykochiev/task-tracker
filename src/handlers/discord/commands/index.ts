import { APIApplicationCommandInteraction, ApplicationCommandType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import TrackerEntity from "../../../db/entity/tracker.entity";
import withExistingTracker from "../../../utils/discord/with-existing-tracker-middleware";
import discordTextToInteraction from "../../../utils/discord/text-to-interaction"

const onNoTracker = (id: string, token: string) => discordTextToInteraction(id, token, {
    content: "Channel is not registered. To register, use /register command with the repository you want to link this chat to."
})    

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log("DISCORD Handling command")
    const interactionData = data.data
    if (interactionData.type !== ApplicationCommandType.ChatInput) return
    const command = interactionData.name
    try {
        switch(command) {
            case "register": await discordHandleRegisterCommand(data); break
            case "unregister": await withExistingTracker({ discord_channel_id: data.channel.id }, (t) => discordHandleUnregisterCommand(data), () => onNoTracker(data.id, data.token)); break
        }
    } catch(e) {
        if(command === "register") await TrackerEntity.delete(data.channel.id)
        console.log("DISCORD error handling", command, "command :", e)
        await discordTextToInteraction(data.id, data.token, {
            content: `Error handling ${command} command: ${e}`
        })
    }
    return
}