import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import InstallationEntity from "../../../../db/entity/installation.entity";
import discordSendMessageToChannel from "../../../../discord/api/messages/send-message";
import { DISCORD_PING_ROLE_SELECT } from "../../../../const/discord/default";
import RegisterStatus from "../../../../db/enum/register-status";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import handleChannelRegistrationFailure from "../../../../utils/general/handle-channel-registration-failure";
import { makeDatabaseRequest } from "../../../../utils/db/repository-request";
import { log } from "console";
import RepositoryEntity from "../../../../db/entity/repository.entity";

async function updateEachRepository(owner: string, name: string, newInstallation: InstallationEntity) {
    const getRepositoryRes = await makeDatabaseRequest(RepositoryEntity, "findOneBy", {
        owner: owner,
        name: name
    })
    if (getRepositoryRes.err || !getRepositoryRes.data) return
    const targetRepositoryId = getRepositoryRes.data.id
    await makeDatabaseRequest(RepositoryEntity, "update", targetRepositoryId, {
        installation: newInstallation 
    })
    const getTrackersRes = await makeDatabaseRequest(TrackerEntity, "findBy", {
        github_repository: {
            id: targetRepositoryId
        },
        register_status: RegisterStatus.PendingInstallation
    })
    if (getTrackersRes.err !== null) return
    getTrackersRes.data.map(async (tracker: TrackerEntity) => await gotoRoleSelectRegisterationPhase(tracker.discord_channel_id))
}

export async function gotoRoleSelectRegisterationPhase(trackerId: TrackerEntity["discord_channel_id"]) {
    const getTrackerRes = await makeDatabaseRequest(TrackerEntity, "findOneById", trackerId)
    if (getTrackerRes.err || !getTrackerRes.data) {
        log(getTrackerRes.err)
        return
    }
    if (!getTrackerRes.data.role_to_ping) {
        const updateTrackerRes = await makeDatabaseRequest(TrackerEntity, "update", trackerId, {
            register_status: RegisterStatus.PendingRole
        })
        if (updateTrackerRes.err) {
            handleChannelRegistrationFailure(trackerId, "Database request error")
            return
        }
        const messageRes = await discordSendMessageToChannel(trackerId, {
            content: "Github App successfully installed. Now select the role you want to ping on events:",
            components: [DISCORD_PING_ROLE_SELECT]
        })
        if (messageRes.err) {
            handleChannelRegistrationFailure(trackerId, "Discord API request error")
        }
        return
    }
    const updateTrackerRes = await makeDatabaseRequest(TrackerEntity, "update", trackerId, {
        register_status: RegisterStatus.Registered
    })
    if (updateTrackerRes.err) {
        handleChannelRegistrationFailure(trackerId, "Database request error")
        return
    }
    await discordSendMessageToChannel(trackerId, {
        content: "Channel is registered."
    })
    return
}

export default async function githubHandleInstallationCreateEvent(data: InstallationCreatedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const saveInstallationRes = await makeDatabaseRequest(InstallationEntity, "save", {
        id: String(data.installation.id),
        user_id: String(data.sender.id),
        organization_id: data.organization && String(data.organization.id)
    })
    if (saveInstallationRes.err !== null) {
        log(saveInstallationRes.err)
        return
    }
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => await updateEachRepository(owner, repository.name, saveInstallationRes.data))
    return
}