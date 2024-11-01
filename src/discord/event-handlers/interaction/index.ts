import { GatewayInteractionCreateDispatchData, InteractionType } from "discord-api-types/v10";
import discordHandleApplicationCommandInteraction from "./commands";

export default async function discordHandleInteractionCreate(data: GatewayInteractionCreateDispatchData) {
    switch(data.type) {
        case InteractionType.ApplicationCommand: discordHandleApplicationCommandInteraction(data); break
    }
    return
}