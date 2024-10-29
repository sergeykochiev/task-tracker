import { GatewayInteractionCreateDispatchData, InteractionType } from "discord-api-types/v10";
import discordHandleApplicationCommandInteraction from "./commands";
import githubHandleInteractionMessageComponent from "./message-component";

export default async function discordHandleInteractionCreate(data: GatewayInteractionCreateDispatchData) {
    switch(data.type) {
        case InteractionType.ApplicationCommand: discordHandleApplicationCommandInteraction(data); break
        case InteractionType.MessageComponent: githubHandleInteractionMessageComponent(data); break
    }
    return
}