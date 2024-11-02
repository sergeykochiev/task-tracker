import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData, ApplicationCommandType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import discordHandleCreateMacroCommand from "./create-macro";

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log("Handling command")
    const interactionData = data.data
    if (interactionData.type == ApplicationCommandType.ChatInput) {
        switch(interactionData.name) {
            case "register": await discordHandleRegisterCommand(data as APIChatInputApplicationCommandInteraction); break
            case "unregister": await discordHandleUnregisterCommand(data); break
            case "create-macro": await discordHandleCreateMacroCommand(data); break
        }
    }
    return
}