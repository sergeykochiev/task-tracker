import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10"
import discordReplyToInteractionWithText from "../../../api/routes/interactions/send-plain-text-as-interaction-reply"
import RegisterStatus from "../../../../../db/enum/register-status"
import DiscordRegisterCommandInteraction from "../../../../../types/discord/register-command-interaction"
import getOwnerAndNameFromRepositoryUrl from "../../../../general/get-owner-and-name-from-repo-url"
import dbGetTrackerById, { dbSaveTracker, dbUpdateTracker } from "../../../../db/tracker"
import { dbGetRepositoryByOwnerAndName, dbSaveRepository } from "../../../../db/repository"

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordReplyToInteractionWithText(data.id, data.token, "This command can only be used inside a server")
        return
    }
    const perhapsThereIsTracker = await dbGetTrackerById(data.channel.id)
    if(perhapsThereIsTracker && perhapsThereIsTracker.register_status != RegisterStatus.Failed) {
        await discordReplyToInteractionWithText(data.id, data.token, "Operation is not possible. If you believe everything is right, /unregister the chat and try again.")
        return
    }
    const targetUserId = data.member!.user.id
    const [targetRepositoryOwner, targetRepositoryName] = getOwnerAndNameFromRepositoryUrl((data as DiscordRegisterCommandInteraction).data.options![0].value)
    let perhapsThereIsRepo
    perhapsThereIsRepo = await dbGetRepositoryByOwnerAndName(targetRepositoryOwner, targetRepositoryName)
    if (!perhapsThereIsRepo) {
        perhapsThereIsRepo = await dbSaveRepository({
            name: targetRepositoryName,
            owner: targetRepositoryOwner
        })
    }
    if (perhapsThereIsTracker) {
        await dbUpdateTracker(perhapsThereIsTracker.discord_channel_id, {
            registrar_id: targetUserId,
            github_repository: perhapsThereIsRepo,
            register_status: RegisterStatus.PendingInstallation
        })
    } else {
        await dbSaveTracker({
            discord_channel_id: data.channel.id,
            github_repository: perhapsThereIsRepo,
            discord_guild_id: data.guild_id,
            registrar_id: targetUserId,
            time_created: `${new Date().getTime()}`,
            register_status: RegisterStatus.PendingInstallation
        })
    }
    await discordReplyToInteractionWithText(data.id, data.token, "Registration initiated. Check your DMs for further instructions!")
    return
}