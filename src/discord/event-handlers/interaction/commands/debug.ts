import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import MacroEntity from "../../../../db/entity/macro.entity";

export default async function discordHandleDebugMacroCommand(data: APIApplicationCommandInteraction) {
    const macro = await MacroEntity.findOne({
        where: {
            trackers: {
                discord_channel_id: data.channel.id
            }
        },
        relations: {
            trackers: true
        }
    })
    macro ? console.dir(macro) : console.log("no tracker found")
    return
}