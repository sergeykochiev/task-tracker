import DiscordConfig from "../src/config/env/discord.config";
import ALL_COMMANDS from "../src/const/discord/global-commands";
import discordInstallGlobalCommands from "../src/discord/api/install-global-commands";

discordInstallGlobalCommands(DiscordConfig.APP_ID, ALL_COMMANDS)