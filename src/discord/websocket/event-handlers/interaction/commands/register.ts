import { APIApplicationCommandInteraction, InteractionContextType, InteractionResponseType } from "discord-api-types/v10"
import RegisterStatus from "../../../../../db/enum/register-status"
import DiscordRegisterCommandInteraction from "../../../../../types/discord/register-command-interaction"
import getOwnerAndNameFromRepositoryUrl from "../../../../../utils/general/get-owner-and-name-from-repo-url"
import GITHUB_REPOSITORY_URL_REGEXP from "../../../../../const/github/repository-url-regexp"
import RepositoryEntity from "../../../../../db/entity/repository.entity"
import GITHUB_APP_INSTALL_URL from "../../../../../const/github/new-install-url"
import discordMessageToInteraction from "../../../../../utils/discord/api/messages/reply-channel-message-with-source"
import { makeDatabaseRequest } from "../../../../../utils/db/repository-request"
import TrackerEntity from "../../../../../db/entity/tracker.entity"
import discordReplyToInteraction from "../../../../../utils/discord/api/interactions/reply-to-interaction"
import { ErrorWrapperReturnType } from "../../../../../utils/general/error-wrapper"
import githubCheckIfRepoHaveAnInstall from "../../../../../utils/github/check-if-repo-have-an-install"

async function failRegistration(id: string, token: string, reason?: string) {
    await discordReplyToInteraction(id, token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: `Failed to register channel, reason: ${reason}`
        }
    })
}

async function getOrAddRepository(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]): Promise<ErrorWrapperReturnType<RepositoryEntity>> {
    let repository = await makeDatabaseRequest(RepositoryEntity, "findOneBy", {
        owner: owner,
        name: name
    })
    if(repository.err !== null) {
        return repository
    }
    if (!repository.data) {
        return await makeDatabaseRequest(RepositoryEntity, "save", {
            owner: owner,
            name: name
        })
    }
    return repository as ErrorWrapperReturnType<RepositoryEntity>
}

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    console.log("Starting registration process...")
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "This command can only be used inside a server"
        })
        return
    }
    const getTrackerRes = await makeDatabaseRequest(TrackerEntity, "findOneById", data.channel.id)
    if (getTrackerRes.err !== null) {
        failRegistration(data.id, data.token, "error checking if channel is registered already")
        return
    }
    const targetTracker = getTrackerRes.data
    if(targetTracker && targetTracker.register_status == RegisterStatus.Registered) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Channel already registered. To register again, /unregister first."
        })
        return
    }
    const commandOptions = (data as DiscordRegisterCommandInteraction).data.options
    const interactionDataRepositoryUrl = commandOptions[0].value 
    const role = commandOptions[1].value
    if (!GITHUB_REPOSITORY_URL_REGEXP.test(interactionDataRepositoryUrl)) {
        await discordMessageToInteraction(data.id, data.token, {
            content: `*${interactionDataRepositoryUrl}* is not a valid Github repository URL.`
        })
        return
    }
    const [owner, repo] = getOwnerAndNameFromRepositoryUrl(interactionDataRepositoryUrl)
    const getOrAddRepositoryRes = await getOrAddRepository(owner, repo)
    if (getOrAddRepositoryRes.err !== null) {
        failRegistration(data.id, data.token, "error saving repository info")
        return
    }
    const targetRepository = getOrAddRepositoryRes.data
    const interactionUserId = data.member!.user.id
    let trackerStatus: RegisterStatus = RegisterStatus.PendingInstallation
    if (!targetRepository.installationId) {
        const res = await githubCheckIfRepoHaveAnInstall(owner, repo)
        if(res.err !== null) {
            failRegistration(data.id, data.token, "couldn't check wheither your repository has the app installed")
            return
        }
        if(res.data.hasInstall) {
            trackerStatus = RegisterStatus.Registered
            const updateRepoRes = await makeDatabaseRequest(RepositoryEntity, "update", targetRepository.id, {
                installationId: String(res.data.res.id)
            })
            if(updateRepoRes.err !== null) {
                failRegistration(data.id, data.token, "couldn't save installation data")
                return
            }
        }
    }
    let saveOrUpdateTrackerRes;
    if (targetTracker) {
        saveOrUpdateTrackerRes = await makeDatabaseRequest(TrackerEntity, "update", targetTracker.discord_channel_id, {
            registrar_id: interactionUserId,
            github_repository: targetRepository,
            register_status: trackerStatus
        })
    } else {
        saveOrUpdateTrackerRes = await makeDatabaseRequest(TrackerEntity, "save", {
            discord_channel_id: data.channel.id,
            github_repository: targetRepository,
            discord_guild_id: data.guild_id,
            registrar_id: interactionUserId,
            time_created: `${new Date().getTime()}`,
            register_status: trackerStatus
        })
    }
    if (saveOrUpdateTrackerRes.err) {
        failRegistration(data.id, data.token, "error saving registration data")
        return
    }
    trackerStatus == RegisterStatus.PendingInstallation ? await discordMessageToInteraction(data.id, data.token, {
        content: `Registration initiated. You need to [install](<${GITHUB_APP_INSTALL_URL}>) TaskTracer app on Github.`
    }) : await discordMessageToInteraction(data.id, data.token, {
        content: `Registration complete.`
    })
    return
}