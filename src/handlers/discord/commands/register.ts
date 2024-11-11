import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10"
import GITHUB_APP_INSTALL_URL from "../../../const/github/new-install-url"
import GITHUB_REPOSITORY_URL_REGEXP from "../../../const/github/repository-url-regexp"
import RepositoryEntity from "../../../db/entity/repository.entity"
import TrackerEntity from "../../../db/entity/tracker.entity"
import RegisterStatus from "../../../enum/register-status"
import { DiscordRegisterCommandInteraction } from "../../../types/discord/command-interactions"
import discordMessageToInteraction from "../../../utils/discord/text-to-interaction"
import getFullnameFromRepositoryUrl from "../../../utils/general/get-owner-and-name-from-repo-url"
import githubCheckIfRepoHaveAnInstall from "../../../utils/github/check-if-repo-have-an-install"
import githubCreateBaseLabels from "../../../utils/github/api/create-base-labels"

async function getOrAddRepository(fullname: string): Promise<RepositoryEntity> {
    let repository = await RepositoryEntity.findOneBy({ fullname })
    if (!repository) {
        return await RepositoryEntity.save({ fullname })
    }
    return repository
}

async function saveOrUpdateTracker(tracker: TrackerEntity | null, repository: RepositoryEntity, channelId: string, status: RegisterStatus, role?: string) {
    if (tracker) {
        return await TrackerEntity.update(tracker.discord_channel_id, {
            github_repository: repository,
            register_status: status,
            role_to_ping: role
        })
    } else {
        return await TrackerEntity.save({
            discord_channel_id: channelId,
            github_repository: repository,
            register_status: status,
            role_to_ping: role,
        })
    }
}

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    console.log("DISCORD Starting registration process...")
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
    const role = commandOptions[1] ? commandOptions[1].value : undefined
    if (!GITHUB_REPOSITORY_URL_REGEXP.test(interactionDataRepositoryUrl)) {
        await discordMessageToInteraction(data.id, data.token, {
            content: `*${interactionDataRepositoryUrl}* is not a valid Github repository URL.`
        })
        return
    }
    const fullname = getFullnameFromRepositoryUrl(interactionDataRepositoryUrl)
    const targetRepository = await getOrAddRepository(fullname)
    const res = await githubCheckIfRepoHaveAnInstall(fullname)
    if(res.hasInstall) {
        await saveOrUpdateTracker(targetTracker, targetRepository, data.channel.id, RegisterStatus.Registered, role)
        githubCreateBaseLabels(fullname, res.installation.id)
        await discordMessageToInteraction(data.id, data.token, {
            content: `Registration complete.`
        })
        return
    }
    await saveOrUpdateTracker(targetTracker, targetRepository, data.channel.id, RegisterStatus.PendingInstallation, role)
    await discordMessageToInteraction(data.id, data.token, {
        content: `Registration initiated. You need to [install](<${GITHUB_APP_INSTALL_URL}>) TaskTracer app on Github.`
    })
}