import { APIApplicationCommandInteraction, ComponentType, GatewayDispatchEvents, InteractionResponseType } from "discord-api-types/v10";
import discordReplyToInteraction from "../../../../../../api/interactions/reply/reply-to-interaction";

export default async function discordhandleCreateMacroFromDiscordToGithubCommand(data: APIApplicationCommandInteraction) {
    // const res = await discordReplyToInteraction(data.id, data.token, {
    //     type: InteractionResponseType.ChannelMessageWithSource,
    //     data: {
    //         content: "Choose a Discord event macro should trigger on:",
    //         components: [
    //             {
    //                 type: ComponentType.ActionRow,
    //                 components: [
    //                     {
    //                         type: ComponentType.StringSelect,
    //                         custom_id: "create-macro_discord_github_event",
    //                         max_values: 1,
    //                         min_values: 1,
    //                         options: Object.values(GatewayDispatchEvents).map((event: GatewayDispatchEvents) => {
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
    // if (!res.err && !res.data.ok) console.error(JSON.stringify(res.data.data))
}