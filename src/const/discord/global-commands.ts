import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, GatewayDispatchEvents, InteractionContextType, RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10"
import GithubMacroAction from "../../db/enum/github-event-action"
import GithubEventType from "../../enum/github/event-type"
import DiscordMacroAction from "../../db/enum/discord-event-action"

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

const DiscordEventOption = {
    name: "discord-event",
    description: "The event itself macro should respond to",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    choices: Object.values(GatewayDispatchEvents).map((event: GatewayDispatchEvents) => {
        return {
            name: event.toLowerCase(),
            value: event
        }
    })
}
const GithubEventOption = {
    name: "github-event",
    description: "The event itself macro should respond to",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    choices: Object.values(GithubEventType).map((event: GithubEventType) => {
        return {
            name: event,
            value: event.toUpperCase()
        }
    })
}
const DiscordActionOption = {
    name: "discord-action",
    description: "The action on Discord that will happen when the event fires",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    choices: Object.values(DiscordMacroAction).map((action: DiscordMacroAction) => {
        return {
            name: action.toLowerCase(),
            value: action
        }
    })
}
const GithubActionOption = {
    name: "github-action",
    description: "The action on Github that will happen when the event fires",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    required: true,
    choices: Object.values(GithubMacroAction).map((action: GithubMacroAction) => {
        return {
            name: action.toLowerCase(),
            value: action
        }
    })
}
// const ToGithubSubcommand = {
//     name: "to-github",
//     description: "The macro action target - Github",
//     type: ApplicationCommandOptionType.Subcommand as ApplicationCommandOptionType.Subcommand,
//     required: true,
//     options: [DiscordEventOption, GithubActionOption]
// }

const CREATE_MACRO_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: "create-macro",
    description: "Create a macro that can execute various actions based on event from Github or Discord",
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "from-discord",
            description: "Creates a macro that takes an action based on the event from Discord.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "to-github",
                    description: "Creates a macro that takes an action on Github based on the event from Discord.",
                    type: ApplicationCommandOptionType.Subcommand as ApplicationCommandOptionType.Subcommand,
                    // required: true,
                    // options: [DiscordEventOption, GithubActionOption]
                }
            ]
        },
        {
            name: "from-github",
            description: "Creates a macro that takes an action based on the event from Github.",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "to-github",
                    description: "Creates a macro that takes an action on Github based on the event from Github.",
                    type: ApplicationCommandOptionType.Subcommand as ApplicationCommandOptionType.Subcommand,
                    // required: true,
                    // options: [DiscordEventOption, GithubActionOption]
                },
                {
                    name: "to-discord",
                    description: "Creates a macro that takes an action on Discord based on the event from Github.",
                    type: ApplicationCommandOptionType.Subcommand,
                    // options: [GithubEventOption, DiscordActionOption]
                }
            ]
        },
    ]
}

const ALL_COMMANDS = [REGISTER_COMMAND, UNREGISTER_COMMAND, CREATE_MACRO_COMMAND] as const

export default ALL_COMMANDS