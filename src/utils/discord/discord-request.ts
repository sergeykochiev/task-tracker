import DiscordConst from "../../const/discord/discord";
import DiscordApiRequestError from "../../error/discord/request-error";

async function discordMakeRequest(endpoint: string, options: Record<string, any>): Promise<Response> {
    const url = DiscordConst.URL.API_ROOT + endpoint
    if (options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: DiscordConst.AUTH_HEADERS,
        ...options
    })
    if (!res.ok) {
        throw new DiscordApiRequestError(res.status, res.statusText)
    }
    return res;
}

export default discordMakeRequest