import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10";
import { log } from "console";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import { makeDatabaseRequest } from "../../../../db/repository-request";
import discordMessageToInteraction from "../../../../utils/discord/api/messages/reply-channel-message-with-source";

export default async function discordHandleUnregisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "This command can only be used inside a server"
        })
        return
    }
    await TrackerEntity.delete(data.channel.id)
    await discordMessageToInteraction(data.id, data.token, {
        content: "Channel unregistered."
    })
    return
}