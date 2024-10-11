import { APIApplicationCommandInteractionDataStringOption, APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData } from "discord-api-types/v10";

interface DiscordRegisterCommandInteractionData extends APIChatInputApplicationCommandInteractionData {
    options: [APIApplicationCommandInteractionDataStringOption]
}

interface DiscordRegisterCommandInteraction extends APIChatInputApplicationCommandInteraction {
    data: DiscordRegisterCommandInteractionData
}

export default DiscordRegisterCommandInteraction