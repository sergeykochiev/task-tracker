import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import TrackerEntity from "../../db/entity/tracker.entity";
import discordTextToInteraction from "./text-to-interaction";

export default async function withExistingTracker<T extends APIApplicationCommandInteraction>(data: T, callback: (data: T) => Promise<any>) {
    const tracker = await TrackerEntity.findOneBy({
        discord_channel_id: data.channel.id
    })
    if(tracker !== undefined) return await callback(data)
    await discordTextToInteraction(data.id, data.token, {
        content: "Channel is not registered. To register, use /register command with the repository you want to link this chat to."
    })    
}