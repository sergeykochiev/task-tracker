import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10"

const REGISTER_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: 'register',
    description: 'Registers a chat to track a specific GitHub repository',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "repository-url",
            description: "URL of a Github repository you want to link this chat to",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
} as const

const UNREGISTER_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: 'unregister',
    description: 'Unregisters a chat from tracking a specific GitHub repository',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
} as const

const ALL_COMMANDS = [REGISTER_COMMAND, UNREGISTER_COMMAND] as const

export default ALL_COMMANDS