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
            description: "URL of a Github repository you want to link this channel to",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "ping-on-events",
            description: "A role Bot will ping in every message in this channel",
            type: ApplicationCommandOptionType.Role,
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

const CREATE_MACRO_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: "create-macro",
    description: "Create a macro that can execute various actions based on event from Github or Discord",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const ALL_COMMANDS = [REGISTER_COMMAND, UNREGISTER_COMMAND, CREATE_MACRO_COMMAND] as const

export default ALL_COMMANDS