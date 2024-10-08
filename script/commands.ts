import 'dotenv/config';
import envconfig from '../src/config/env/discord.config.js';
import InstallGlobalCommands from '../src/utils/discord/install-global-commands.js';
import CommandTypes from '../src/enum/discord/command-types.js';
import { ApplicationIntegrationType, InteractionContextType } from "discord-api-types/v10"

const REGISTER_COMMAND = {
    name: 'register',
    description: 'Registers a chat as a task supplier',
    type: CommandTypes.CHAT_INPUT,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
} as const

const CONFIGURE_COMMAND = {
    name: 'configure',
    description: 'Configures roles and users that are able to register chats',
    type: CommandTypes.CHAT_INPUT,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
} as const

const ALL_COMMANDS = [REGISTER_COMMAND, CONFIGURE_COMMAND] as const;

InstallGlobalCommands(envconfig.APP_ID, ALL_COMMANDS);
