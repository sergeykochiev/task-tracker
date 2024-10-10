import DiscordConst from "../../const/discord/discord";
import DiscordRequest from "./discord-request";

export default async function discordInstallGlobalCommands(appId: string, commands: Record<any, any>) {
    const endpoint = DiscordConst.URL.ENDPOINTS.COMMANDS(appId);
    try {
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
}