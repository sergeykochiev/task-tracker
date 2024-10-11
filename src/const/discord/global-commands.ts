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

const CONFIGURE_COMMAND = {
    name: 'configure',
    description: 'Configures roles and users that are able to register chats',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild]
} as const

const ALL_COMMANDS = [REGISTER_COMMAND, CONFIGURE_COMMAND] as const

export default ALL_COMMANDS