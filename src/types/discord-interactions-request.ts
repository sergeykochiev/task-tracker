import { APIApplicationCommandInteractionData, APIBaseInteraction, InteractionType } from "discord-api-types/v10";
import { Request } from "express";

interface DiscordInteractionsRequest extends Request {
    body: APIBaseInteraction<InteractionType, APIApplicationCommandInteractionData>
}

export default DiscordInteractionsRequest