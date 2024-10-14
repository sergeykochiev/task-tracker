import AppDataSource from "../../../../../db/data-source"
import DiscordGuildEntity from "../../../../../db/entity/guild.entity"
import ConfigureStatus from "../../../../../db/enum/configure-status"
import DatabaseError from "../../../../../error/db/database.error"
import discordReplyToInteraction from "../../../api/reply-to-interaction"
import { APIApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10"
import discordReplyToInteractionWithText from "../../../api/send-plain-text-as-interaction-reply"
import { dbGetGuildById } from "../../../../db/guild"

export default async function discordHandleConfigureCommand(data: APIApplicationCommandInteraction) {
    if (!data.guild_id) return
    const perhapsThereIsGuild = await dbGetGuildById(data.guild_id)
    if(perhapsThereIsGuild && (perhapsThereIsGuild.configure_status in [ConfigureStatus.Configured, ConfigureStatus.Default])) {
        await discordReplyToInteractionWithText(data.id, data.token, "Server already configured, there's no need for such trouble now")
    }
    const guildRepository = AppDataSource.getRepository(DiscordGuildEntity)
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