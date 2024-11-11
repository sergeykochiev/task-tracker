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

const ALL_COMMANDS: Array<RESTPostAPIApplicationCommandsJSONBody> = [REGISTER_COMMAND, UNREGISTER_COMMAND] as const

export default ALL_COMMANDS