import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import InstallationEntity from "../../../../db/entity/installation";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import { DISCORD_PING_ROLE_SELECT } from "../../../../const/discord/default";
import RegisterStatus from "../../../../db/enum/register-status";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import handleChannelRegistrationFailure from "../../../general/handle-channel-registration-failure";
import { databaseGetRepositoryByOwnerAndName, databaseUpdateRepository } from "../../../db/repository";
import { databaseGetTrackerById, databaseUpdateTrackerStatus } from "../../../db/tracker";
import { makeDatabaseRequest } from "../../../db/repository-request";
import { databaseSaveInstallation } from "../../../db/installation";
import { log } from "console";

async function updateEachRepository(owner: string, name: string, newInstallation: InstallationEntity) {
    const getRepositoryRes = await databaseGetRepositoryByOwnerAndName(owner, name)
    if (getRepositoryRes.err || !getRepositoryRes.data) return
    const targetRepositoryId = getRepositoryRes.data.id
    await databaseUpdateRepository(targetRepositoryId, {
        installation: newInstallation 
    })
    const getTrackersRes = await makeDatabaseRequest(TrackerEntity, "findBy", {
        github_repository: {
            id: targetRepositoryId
        },
        register_status: RegisterStatus.PendingInstallation
    })
    if (getTrackersRes.err) return
    getTrackersRes.data.map(async (tracker: TrackerEntity) => await gotoRoleSelectRegisterationPhase(tracker.discord_channel_id))
}

export async function gotoRoleSelectRegisterationPhase(trackerId: TrackerEntity["discord_channel_id"]) {
    const getTrackerRes = await databaseGetTrackerById(trackerId)
    if (getTrackerRes.err || !getTrackerRes.data) {
        log(getTrackerRes.err)
        return
    }
    if (!getTrackerRes.data.role_to_ping) {
        const updateTrackerRes = await databaseUpdateTrackerStatus(trackerId, RegisterStatus.PendingRole)
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
    const updateTrackerRes = await databaseUpdateTrackerStatus(trackerId, RegisterStatus.Registered)
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
    const saveInstallationRes = await databaseSaveInstallation({
        id: String(data.installation.id),
        user_id: String(data.sender.id),
        organization_id: data.organization && String(data.organization.id)
    })
    if (saveInstallationRes.err) {
        log(saveInstallationRes.err)
        return
    }
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => await updateEachRepository(owner, repository.name, saveInstallationRes.data))
    return
}