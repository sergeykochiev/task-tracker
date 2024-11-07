import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import TrackerEntity from "../../db/entity/tracker.entity";
import discordReplyToInteraction from "./api/interactions/reply-to-interaction";

export default async function withExistingTracker<T extends APIApplicationCommandInteraction>(data: T, callback: (data: T) => Promise<any>) {
    const tracker = await TrackerEntity.findOneBy({
        discord_channel_id: data.channel.id
    })
    if(!tracker) {
        await discordReplyToInteraction(data.id, data.token, {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Channel is not registered. To register, use /register command with the repository you want to link this chat to."
            }
        })
        return
    }
    return await callback(data)
}