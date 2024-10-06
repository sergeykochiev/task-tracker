import 'dotenv/config';
import envconfig from '../src/config/env/env.config.js';
import InstallGlobalCommands from './utils/install-global-commands.js';

// Simple test command
const TEST_COMMAND = {
    name: 'test',
    description: 'Basic command',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
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

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND] as const;

InstallGlobalCommands(envconfig.APP_ID, ALL_COMMANDS);
