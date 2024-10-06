import discordConfig from "../config/env/discord.config";
import { ROOT_API_URL } from "../config/const/route.config";

export default async function DiscordRequest(endpoint: string, options: Record<string, any>) {
    const url = ROOT_API_URL + endpoint;
    if (options.body) options.body = JSON.stringify(options.body);
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bot ${discordConfig.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
        ...options
    });
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    return res;
}