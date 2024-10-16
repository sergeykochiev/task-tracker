import { DISCORD_AUTH_HEADERS, DISCORD_V10_API_ROOT } from "../../../const/api/discord.api";
import ApiRequestError from "../../../error/app/request.error";

async function discordMakeRequest(endpoint: string, options?: Record<string, any>): Promise<Response> {
    const url = DISCORD_V10_API_ROOT + endpoint
    if (options && options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: DISCORD_AUTH_HEADERS,
        ...options
    })
    if (!res.ok) {
        throw new ApiRequestError(res.status, res.statusText, await res.json())
    }
    return res;
}

export default discordMakeRequest