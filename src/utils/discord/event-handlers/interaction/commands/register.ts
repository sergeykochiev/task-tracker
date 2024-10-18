import { APIApplicationCommandInteraction, InteractionContextType, InteractionResponseType } from "discord-api-types/v10"
import discordReplyToInteractionWithText from "../../../api/routes/interactions/send-plain-text-as-interaction-reply"
import RegisterStatus from "../../../../../db/enum/register-status"
import DiscordRegisterCommandInteraction from "../../../../../types/discord/register-command-interaction"
import getOwnerAndNameFromRepositoryUrl from "../../../../general/get-owner-and-name-from-repo-url"
import GITHUB_REPOSITORY_URL_REGEXP from "../../../../../const/github/repository-url-regexp"
import RepositoryEntity from "../../../../../db/entity/repository.entity"
import { databaseGetRepositoryByOwnerAndName, databaseSaveRepository } from "../../../../db/repository"
import { databaseGetTrackerById, databaseSaveTracker, databaseUpdateTracker } from "../../../../db/tracker"
import { log } from "console"
import { gotoRoleSelectRegisterationPhase } from "../../../../github/event-handlers/installation/create"
import discordReplyToInteraction from "../../../api/routes/interactions/reply-to-interaction"
import GITHUB_APP_INSTALL_URL from "../../../../../const/github/new-install-url"

async function getOrAddRepository(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]) {
    let repository
    repository = await databaseGetRepositoryByOwnerAndName(owner, name)
    if (!repository) {
        repository = await databaseSaveRepository({
            owner: owner,
            name: name
        })
    }
    return repository
}
export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordReplyToInteractionWithText(data.id, data.token, "This command can only be used inside a server")
        return
    }
    const getTrackerRes = await databaseGetTrackerById(data.channel.id)
    if (getTrackerRes.err) {
        log(getTrackerRes.err)
        return
    }
    const targetTracker = getTrackerRes.data
    if(targetTracker && targetTracker.register_status != RegisterStatus.Failed) {
        await discordReplyToInteractionWithText(data.id, data.token, "Channel already registered. To register again, /unregister first.")
        return
    }
    const interactionDataRepositoryUrl = (data as DiscordRegisterCommandInteraction).data.options![0].value 
    if (!GITHUB_REPOSITORY_URL_REGEXP.test(interactionDataRepositoryUrl)) {
        await discordReplyToInteractionWithText(data.id, data.token, `*${interactionDataRepositoryUrl}* is not a valid Github repository URL.`)
        return
    }
    const getOrAddRepositoryRes = await getOrAddRepository(...getOwnerAndNameFromRepositoryUrl(interactionDataRepositoryUrl))
    if (getOrAddRepositoryRes.err) {
        log(getOrAddRepositoryRes.err)
        return
    }
    const targetRepository = getOrAddRepositoryRes.data
    if (!targetRepository) return
    const interactionUserId = data.member!.user.id
    let saveOrUpdateTrackerRes;
    if (targetTracker) {
        saveOrUpdateTrackerRes = await databaseUpdateTracker(targetTracker.discord_channel_id, {
            registrar_id: interactionUserId,
            github_repository: targetRepository,
            register_status: RegisterStatus.PendingInstallation
        })
    } else {
        saveOrUpdateTrackerRes = await databaseSaveTracker({
            discord_channel_id: data.channel.id,
            github_repository: targetRepository,
            discord_guild_id: data.guild_id,
            registrar_id: interactionUserId,
            time_created: `${new Date().getTime()}`,
            register_status: RegisterStatus.PendingInstallation
        })
    }
    if (saveOrUpdateTrackerRes.err) {
        log(saveOrUpdateTrackerRes.err)
        return
    }
    if (targetRepository.installation) {
        await gotoRoleSelectRegisterationPhase(data.channel.id)
        return
    }
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Registration initiated. You need to [install](${GITHUB_APP_INSTALL_URL}) TaskTracer app on Github.`,
            embeds: []
        }
    })
    return
}