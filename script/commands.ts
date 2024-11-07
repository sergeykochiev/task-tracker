import ALL_COMMANDS from "../src/const/discord/global-commands";
import DiscordConfig from "../src/envcfg/discord.config";
import discordInstallGlobalCommands from "../src/utils/discord/api/install-global-commands";

async function InstallGlobalCommands() {
    const res = await discordInstallGlobalCommands(DiscordConfig.APP_ID, ALL_COMMANDS)
    console.dir(await res.json(), {
        depth: Infinity
    })
}

InstallGlobalCommands()