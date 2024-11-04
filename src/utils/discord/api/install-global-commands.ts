import { DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from "../../../const/discord/api";

export default async function discordInstallGlobalCommands(appId: string, commands: Record<any, any>) {
    return await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.COMMANDS(appId), {
        method: 'PUT',
        body: JSON.stringify(commands)
    })
}