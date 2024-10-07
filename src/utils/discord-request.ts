import DiscordConst from "../const/discord";

export default async function DiscordRequest(endpoint: string, options: Record<string, any>) {
    const url = DiscordConst.URL.API_ROOT + endpoint
    if (options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: DiscordConst.AUTH_HEADERS,
        ...options
    })
    if (!res.ok) {
        const data = await res.json()
        console.log(res.status)
        throw new Error(JSON.stringify(data))
    }
    return res;
}