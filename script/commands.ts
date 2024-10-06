import 'dotenv/config';
import envconfig from '../src/config/env/discord.config.js';
import InstallGlobalCommands from '../src/utils/install-global-commands.js';
import IntegrationTypes from '../src/enum/integration-types.js';
import InteractionContextTypes from '../src/enum/interaction-context-types.js';
import CommandTypes from '../src/enum/command-types.js';

// Simple test command
const REGISTER_COMMAND = {
    name: 'register',
    description: 'Registers a chat as a task supplier',
    type: CommandTypes.CHAT_INPUT,
    integration_types: [IntegrationTypes.GUILD_INSTALL],
    contexts: [InteractionContextTypes.GUILD],
};

// Command containing options
const CHALLENGE_COMMAND = {
    name: 'challenge',
    description: 'Challenge to a match of rock paper scissors',
    options: [
        {
        type: 3,
        name: 'object',
        description: 'Pick your object',
        required: true,
        choices: [1, 2],
        },
    ],
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 2],
};

const ALL_COMMANDS = [REGISTER_COMMAND] as const;

InstallGlobalCommands(envconfig.APP_ID, ALL_COMMANDS);
