import replyToInteraction from "../reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./commands/handle-configure"

export default async function discordHandleCommands(data: APIApplicationCommandInteraction): Promise<void> {
    switch(data.data.name) {
        case "register": discordHandleRegisterCommand(data)
        case "configure": 
    }
    return
}