import { APIApplicationCommandInteraction, ComponentType, InteractionResponseType } from "discord-api-types/v10";
import discordReplyToInteraction from "../../../../../../api/interactions/reply/reply-to-interaction";
import GithubEventType from "../../../../../../../enum/github/event-type";

export default async function discordhandleCreateMacroFromGithubToGithubCommand(data: APIApplicationCommandInteraction) {
    // await discordReplyToInteraction(data.id, data.token, {
    //     type: InteractionResponseType.ChannelMessageWithSource,
    //     data: {
    //         content: "Choose a Github event macro should trigger on:",
    //         components: [
    //             {
    //                 type: ComponentType.ActionRow,
    //                 components: [
    //                     {
    //                         type: ComponentType.StringSelect,
    //                         custom_id: "create-macro_github_github_event",
    //                         max_values: 1,
    //                         min_values: 1,
    //                         options: Object.values(GithubEventType).map((event: GithubEventType) => {
    //                             return {
    //                                 label: event.toLowerCase(),
    //                                 value: event,
    //                                 description: event.toLowerCase()
    //                             }
    //                         })
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // })
}