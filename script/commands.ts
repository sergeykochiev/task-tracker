import { DISCORD_AUTH_HEADERS, DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from "../src/const/discord/api";
import ALL_COMMANDS from "../src/const/discord/global-commands";
import DiscordConfig from "../src/envcfg/discord.config";

async function InstallGlobalCommands() {
    await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.COMMANDS(DiscordConfig.APP_ID), {
        headers: DISCORD_AUTH_HEADERS,
        method: 'PUT',
        body: JSON.stringify(ALL_COMMANDS)
    })
}

InstallGlobalCommands()