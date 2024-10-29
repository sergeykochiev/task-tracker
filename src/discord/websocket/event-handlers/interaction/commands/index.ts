import { APIApplicationCommandInteraction, APIApplicationCommandSubcommandGroupOption, ApplicationCommandType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log(JSON.stringify(data))
    const interactionData = data.data
    if (interactionData.type == ApplicationCommandType.ChatInput) {
        switch(interactionData.name) {
            case "register": await discordHandleRegisterCommand(data); break
            case "unregister": await discordHandleUnregisterCommand(data); break
            case "create-macro": {}
        }
    }
    return
}