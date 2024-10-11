import { APIApplicationCommandInteraction } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./commands/handle-register"
import discordHandleConfigureCommand from "./commands/handle-configure"

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    switch(data.data.name) {
        case "register": discordHandleRegisterCommand(data); break
        case "configure": discordHandleConfigureCommand(data); break
    }
    return
}