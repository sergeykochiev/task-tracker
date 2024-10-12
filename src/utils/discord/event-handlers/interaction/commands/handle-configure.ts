import AppDataSource from "../../../../../db/data-source"
import DiscordGuildEntity from "../../../../../db/entity/guild.entity"
import ConfigureStatus from "../../../../../db/enum/configure-status"
import RegisterStatus from "../../../../../db/enum/register-status"
import DatabaseError from "../../../../../error/db/database.error"
import discordReplyToInteraction from "../../../api/reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"

export default async function discordHandleConfigureCommand(data: APIApplicationCommandInteraction) {
    const guildRepository = AppDataSource.getRepository(DiscordGuildEntity)
    console.log("Guild id", data.guild_id)
    if (!data.guild_id) return
    try { 
        await guildRepository.save({
            id: data.guild_id,
            users_can_register: "",
            roles_can_register: "",
            configure_status: ConfigureStatus.PendingRoles,
            configurator_id: data.member?.user.id
        })
        await guildRepository.update(data.guild_id, {
            configure_status: ConfigureStatus.Configured
        })
    } catch(e) {
        throw new DatabaseError(e as string)
    }
    discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Server configured successfully"
        }
    })
    return
}