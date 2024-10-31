import { RESTPutAPIApplicationCommandsResult } from "discord-api-types/v10";
import { DISCORD_ENDPOINTS } from "../../../const/api/discord.api";
import discordMakeRequest from "../discord-request";

export default async function discordInstallGlobalCommands(appId: string, commands: Record<any, any>) {
    return await discordMakeRequest<RESTPutAPIApplicationCommandsResult>(DISCORD_ENDPOINTS.COMMANDS(appId), {
        method: 'PUT',
        body: commands
    })
}