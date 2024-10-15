import { APIApplicationCommandInteraction } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    switch(data.data.name) {
        case "register": discordHandleRegisterCommand(data); break
    }
    return
}