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
            name: "create-default",
            description: "Use defaults or not (messages on issue & PR opened, issue & PR review comment, PR review request)",
            type: ApplicationCommandOptionType.Boolean,
            required: true
        },
        {
            name: "ping-on-events",
            description: "A role Bot will ping in every message in this channel",
            type: ApplicationCommandOptionType.Role,
            required: false
        },
    ]
}

const UNREGISTER_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: 'unregister',
    description: 'Unregisters a chat from tracking a specific GitHub repository',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const CREATE_MACRO_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: "create-macro",
    description: "Create a macro that can execute various actions based on event from Github or Discord",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const ASSIGN_DEFAULTS: RESTPostAPIApplicationCommandsJSONBody = {
    name: "assign-defaults",
    description: "Assign defauls (messages on issue & PR opened, issue & PR review comment, PR review request)",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const DEBUG_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: "debug",
    description: "debug",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const EXPORT_MACROS_COMMANDS: RESTPostAPIApplicationCommandsJSONBody = {
    name: "export-macros",
    description: "Export current channel macros into JSON file (except defaults)",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
}

const IMPORT_MACROS_COMMANDS: RESTPostAPIApplicationCommandsJSONBody = {
    name: "import-macros",
    description: "Import macros to use in current channel via JSON file",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "file",
            description: "JSON file containing macro settings",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ]
}

const ALL_COMMANDS: Array<RESTPostAPIApplicationCommandsJSONBody> = [REGISTER_COMMAND, UNREGISTER_COMMAND, CREATE_MACRO_COMMAND, ASSIGN_DEFAULTS, DEBUG_COMMAND, EXPORT_MACROS_COMMANDS, IMPORT_MACROS_COMMANDS] as const

export default ALL_COMMANDS