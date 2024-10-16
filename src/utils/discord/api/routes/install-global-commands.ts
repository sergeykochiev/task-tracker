import { DISCORD_ENDPOINTS } from "../../../../const/api/discord.api";
import DiscordRequest from "../discord-request";

export default async function discordInstallGlobalCommands(appId: string, commands: Record<any, any>) {
    return await (await DiscordRequest(DISCORD_ENDPOINTS.COMMANDS(appId), { method: 'PUT', body: commands })).json()
}