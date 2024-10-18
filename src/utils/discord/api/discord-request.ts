import { DISCORD_AUTH_HEADERS, DISCORD_V10_API_ROOT } from "../../../const/api/discord.api";
import makeRequest, { ParsedBody, UnparsedBodyRequestInit } from "../../general/request";

type DiscordRequestErrorBody = any

async function discordMakeRequest<T extends ParsedBody>(endpoint: string, options?: Omit<UnparsedBodyRequestInit, "headers">) {
    return await makeRequest<T, DiscordRequestErrorBody>(DISCORD_V10_API_ROOT + endpoint, {
        headers: DISCORD_AUTH_HEADERS,
        ...options
    })
}

export default discordMakeRequest