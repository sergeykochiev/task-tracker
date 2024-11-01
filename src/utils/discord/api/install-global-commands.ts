import { RESTPutAPIApplicationCommandsResult } from "discord-api-types/v10";
import discordMakeRequest from "../discord-request";
import { DISCORD_ENDPOINTS } from "../../../const/discord/api";

export default async function discordInstallGlobalCommands(appId: string, commands: Record<any, any>) {
    return await discordMakeRequest<RESTPutAPIApplicationCommandsResult>(DISCORD_ENDPOINTS.COMMANDS(appId), {
        method: 'PUT',
        body: commands
    })
}