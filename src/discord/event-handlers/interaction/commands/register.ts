import { APIApplicationCommandInteraction, InteractionContextType, InteractionResponseType } from "discord-api-types/v10"
import GITHUB_APP_INSTALL_URL from "../../../../const/github/new-install-url"
import GITHUB_REPOSITORY_URL_REGEXP from "../../../../const/github/repository-url-regexp"
import RepositoryEntity from "../../../../db/entity/repository.entity"
import TrackerEntity from "../../../../db/entity/tracker.entity"
import RegisterStatus from "../../../../enum/register-status"
import discordMessageToInteraction from "../../../../utils/discord/api/messages/reply-channel-message-with-source"
import getOwnerAndNameFromRepositoryUrl from "../../../../utils/general/get-owner-and-name-from-repo-url"
import githubCheckIfRepoHaveAnInstall from "../../../../utils/github/check-if-repo-have-an-install"
import macroAssignDefaults from "../../../../utils/general/macro/assign-defaults"
import { DiscordRegisterCommandInteraction } from "../../../../types/discord/command-interactions"

async function getOrAddRepository(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]): Promise<RepositoryEntity> {
    let repository = await RepositoryEntity.findOneBy({
        owner: owner,
        name: name
    })
    if (!repository) {
        return await RepositoryEntity.save({
            owner: owner,
            name: name
        })
    }
    return repository
}

async function saveOrUpdateTracker(tracker: TrackerEntity | null, repository: RepositoryEntity, channelId: string, status: RegisterStatus, role?: string, defaults?: boolean) {
    if (tracker) {
        return await TrackerEntity.update(tracker.discord_channel_id, {
            github_repository: repository,
            register_status: status,
            role_to_ping: role
        })
    } else {
        const tracker = await TrackerEntity.save({
            discord_channel_id: channelId,
            github_repository: repository,
            time_created: `${new Date().getTime()}`,
            register_status: status,
            role_to_ping: role,
        })
        if(defaults) {
            return await macroAssignDefaults(channelId)
        }
        return tracker
    }
}

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    console.log("Starting registration process...")
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "This command can only be used inside a server"
        })
        return
    }
    const targetTracker = await TrackerEntity.findOneBy({
        discord_channel_id: data.channel.id
    })
    if(targetTracker && targetTracker.register_status == RegisterStatus.Registered) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Channel already registered. To register again, /unregister first."
        })
        return
    }
    const commandOptions = (data as DiscordRegisterCommandInteraction).data.options
    const interactionDataRepositoryUrl = commandOptions[0].value 
    const defaults = commandOptions[1].value
    const role = commandOptions[2] ? commandOptions[2].value : undefined
    if (!GITHUB_REPOSITORY_URL_REGEXP.test(interactionDataRepositoryUrl)) {
        await discordMessageToInteraction(data.id, data.token, {
            content: `*${interactionDataRepositoryUrl}* is not a valid Github repository URL.`
        })
        return
    }
    const [owner, repo] = getOwnerAndNameFromRepositoryUrl(interactionDataRepositoryUrl)
    const targetRepository = await getOrAddRepository(owner, repo)
    let trackerStatus: RegisterStatus = RegisterStatus.Registered
    if (!targetRepository.installationId) {
        const res = await githubCheckIfRepoHaveAnInstall(owner, repo)
        if(res.hasInstall) {
            await RepositoryEntity.update(targetRepository.id, {
                installationId: String(res.res.id)
            })
        } else {
            trackerStatus = RegisterStatus.PendingInstallation
        }
    }
    await saveOrUpdateTracker(targetTracker, targetRepository, data.channel.id, trackerStatus, role, defaults)
    trackerStatus == RegisterStatus.PendingInstallation ? await discordMessageToInteraction(data.id, data.token, {
        content: `Registration initiated. You need to [install](<${GITHUB_APP_INSTALL_URL}>) TaskTracer app on Github.`
    }) : await discordMessageToInteraction(data.id, data.token, {
        content: `Registration complete.`
    })
    return
}