import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, GatewayDispatchEvents, InteractionContextType, RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10"
import GithubMacroAction from "../../db/enum/github-event-action"
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

enum DiscordMacroEvents {
    ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
    ChannelUpdate = "CHANNEL_UPDATE",
    GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
    GuildMemberAdd = "GUILD_MEMBER_ADD",
    GuildMemberRemove = "GUILD_MEMBER_REMOVE",
    GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
    GuildRoleCreate = "GUILD_ROLE_CREATE",
    GuildRoleDelete = "GUILD_ROLE_DELETE",
    GuildRoleUpdate = "GUILD_ROLE_UPDATE",
    GuildStickersUpdate = "GUILD_STICKERS_UPDATE",
    GuildUpdate = "GUILD_UPDATE",
    MessageCreate = "MESSAGE_CREATE",
    MessageDelete = "MESSAGE_DELETE",
    MessageReactionAdd = "MESSAGE_REACTION_ADD",
    MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
    MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
    MessageUpdate = "MESSAGE_UPDATE",
    ThreadCreate = "THREAD_CREATE",
    ThreadDelete = "THREAD_DELETE",
    ThreadMembersUpdate = "THREAD_MEMBERS_UPDATE",
    ThreadMemberUpdate = "THREAD_MEMBER_UPDATE",
    ThreadUpdate = "THREAD_UPDATE",
    GuildScheduledEventCreate = "GUILD_SCHEDULED_EVENT_CREATE",
    GuildScheduledEventUpdate = "GUILD_SCHEDULED_EVENT_UPDATE",
    GuildScheduledEventDelete = "GUILD_SCHEDULED_EVENT_DELETE",
}
enum GithubMacroEvents {
    CodeScanningAlert = "code_scanning_alert",
    CommitComment = "commit_comment",
    Create = "create",
    Delete = "delete",
    DependabotAlert = "dependabot_alert",
    IssueComment = "issue_comment",
    Issues = "issues",
    Label = "label",
    Member = "member",
    Membership = "membership",
    Milestone = "milestone",
    Organization = "organization",
    PageBuild = "page_buld",
    PullRequest = "pull_request",
    PullRequestReviewComment = "pull_request_review_comment",
    PullRequestReview = "pull_request_review",
    PullRequestReviewThread = "pull_request_review_thread",
    RepositoryVulnerabilityAlert = "repository_vulnerability_alert",
    SecurityAdvisory = "security_advisory",
    SecurityAndAnalysis = "security_and_analysis",
    Status = "status",
    SubIssues = "sub_issues",
}

const UNREGISTER_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
    name: 'unregister',
    description: 'Unregisters a chat from tracking a specific GitHub repository',
    type: ApplicationCommandType.ChatInput,
    integration_types: [ApplicationIntegrationType.GuildInstall],
    contexts: [InteractionContextType.Guild],
} as const

const DiscordEventOption = {
    name: "discord-event",
    description: "The event on Discord macro should respond to",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    required: true,
    choices: Object.values(DiscordMacroEvents).map((event: DiscordMacroEvents) => {
        return {
            name: event.toLowerCase(),
            value: event
        }
    })
}
const GithubEventOption = {
    name: "github-event",
    description: "The event on Github macro should respond to",
    type: ApplicationCommandOptionType.String as ApplicationCommandOptionType.String,
    required: true,
    choices: Object.values(GithubMacroEvents).map((event: GithubMacroEvents) => {
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
    required: true,
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
                    options: [DiscordEventOption, GithubActionOption]
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
                    options: [DiscordEventOption, GithubActionOption]
                },
                {
                    name: "to-discord",
                    description: "Creates a macro that takes an action on Discord based on the event from Github.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [GithubEventOption, DiscordActionOption]
                }
            ]
        },
    ]
}

const ALL_COMMANDS = [REGISTER_COMMAND, UNREGISTER_COMMAND, CREATE_MACRO_COMMAND] as const

export default ALL_COMMANDS