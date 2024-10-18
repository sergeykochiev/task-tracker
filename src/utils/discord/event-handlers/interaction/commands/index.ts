import { APIApplicationCommandInteraction } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregistered";

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    switch(data.data.name) {
        case "register": discordHandleRegisterCommand(data); break
        case "unregister": discordHandleUnregisterCommand(data); break
    }
    return
}