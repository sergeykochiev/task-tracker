import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10"
import discordReplyToInteractionWithText from "../../../api/send-plain-text-as-interaction-reply"
import RegisterStatus from "../../../../../db/enum/register-status"
import DiscordRegisterCommandInteraction from "../../../../../types/discord/register-command-interaction"
import discordSendRegistrationConfirmationPromt from "../../../api/send-registration-confirmation-promt"
import discordCreateDMChannel from "../../../api/create-dm-channel"
import getOwnerAndNameFromRepositoryUrl from "../../../../general/get-owner-and-name-from-repo-url"
import RepositoryEntity from "../../../../../db/entity/repository.entity"
import { dbGetGuildById } from "../../../../db/guild"
import dbGetTrackerById, { dbSaveTracker, dbUpdateTracker } from "../../../../db/tracker"
import { dbGetRepositoryByOwnerAndName, dbSaveRepositoryWithoutCredentials } from "../../../../db/repository"

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        discordReplyToInteractionWithText(data.id, data.token, "This command can only be used inside a server")
        return
    }
    const targetGuild = await dbGetGuildById(data.guild_id)
    if (!targetGuild) {
        discordReplyToInteractionWithText(data.id, data.token, "Your server isn't configured, please, use the /configure command!")
        return
    }  
    const perhapsThereIsTracker = await dbGetTrackerById(data.channel.id)
    if(perhapsThereIsTracker && perhapsThereIsTracker.register_status != RegisterStatus.Failed) {
        perhapsThereIsTracker.register_status
        switch(perhapsThereIsTracker.register_status) {
            case RegisterStatus.PendingToken: {
                await discordReplyToInteractionWithText(data.id, data.token, "Woah! Hey there, buddy! Registration is pending, ya can't just initialize another one like that.")
                break
            }
            case RegisterStatus.Registered: {
                await discordReplyToInteractionWithText(data.id, data.token, "Woah! Hey there, buddy! Channel is already registered and receives events. Can't register one channel twice, am I right?")
                break
            }
        }
        return
    }
    const targetUserId = data.member!.user.id
    const [targetRepositoryOwner, targetRepositoryName] = getOwnerAndNameFromRepositoryUrl((data as DiscordRegisterCommandInteraction).data.options![0].value)
    let perhapsThereIsRepo
    perhapsThereIsRepo = await dbGetRepositoryByOwnerAndName(targetRepositoryOwner, targetRepositoryName)
    if (!perhapsThereIsRepo) {
        perhapsThereIsRepo = await dbSaveRepositoryWithoutCredentials({
            id: 
            name: targetRepositoryName,
            owner: targetRepositoryOwner,
            slug: `${targetRepositoryOwner}-${targetRepositoryName}`
        })
    }
    if (perhapsThereIsTracker) {
        await dbUpdateTracker(perhapsThereIsTracker.discord_channel_id, {
            registrar_id: targetUserId,
            github_repository: perhapsThereIsRepo,
            register_status: RegisterStatus.PendingToken
        })
    } else {
        await dbSaveTracker({
            discord_channel_id: data.channel.id,
            github_repository: perhapsThereIsRepo,
            discord_guild: targetGuild,
            registrar_id: targetUserId,
            time_created: `${new Date().getTime()}`,
            register_status: RegisterStatus.PendingToken
        })
    }
    const dm = await discordCreateDMChannel(targetUserId)
    await discordReplyToInteractionWithText(data.id, data.token, "Registration initiated. Check your DMs for further instructions!")
    await discordSendRegistrationConfirmationPromt(dm.id)
    return
}