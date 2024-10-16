import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import { dbGetRepositoryByOwnerAndName, dbUpdateRepository } from "../../../db/repository";
import InstallationEntity from "../../../../db/entity/installation";
import { dbBulkGetTrackersBy, dbUpdateTrackerStatus } from "../../../db/tracker";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import { DISCORD_PING_ROLE_SELECT } from "../../../../const/discord/default";
import RegisterStatus from "../../../../db/enum/register-status";
import TrackerEntity from "../../../../db/entity/tracker.entity";

async function updateEachRepository(owner: string, name: string, newInstallation: InstallationEntity) {
    const targetRepository = await dbGetRepositoryByOwnerAndName(owner, name).catch()
    if (!targetRepository) return
    await dbUpdateRepository(targetRepository.id, {
        installation: newInstallation 
    })
    const trackers = await dbBulkGetTrackersBy({
        github_repository: {
            id: targetRepository.id
        },
        register_status: RegisterStatus.PendingInstallation
    })
    trackers.map(updateEachTracker)
}

async function updateEachTracker(tracker: TrackerEntity) {
    await dbUpdateTrackerStatus(tracker.discord_channel_id, RegisterStatus.PendingRole)
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Github App successfully installed. Now select the role you want to ping on events:",
        components: [DISCORD_PING_ROLE_SELECT]
    })
}

export default async function githubHandleInstallationCreateEvent(data: InstallationCreatedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const newInstallation: InstallationEntity = {
        id: String(data.installation.id),
        user_id: String(data.sender.id),
        organization_id: data.organization && String(data.organization.id)
    }
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => await updateEachRepository(owner, repository.name, newInstallation))
    return
}