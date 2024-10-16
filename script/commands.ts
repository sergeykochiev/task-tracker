import DiscordConfig from "../src/config/env/discord.config";
import ALL_COMMANDS from "../src/const/discord/global-commands";
import discordInstallGlobalCommands from "../src/utils/discord/api/routes/install-global-commands";

discordInstallGlobalCommands(DiscordConfig.APP_ID, ALL_COMMANDS)