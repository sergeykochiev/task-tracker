import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import RegisterStatus from "../../../../db/enum/register-status";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import { makeDatabaseRequest } from "../../../../utils/db/repository-request";
import RepositoryEntity from "../../../../db/entity/repository.entity";
import discordSendMessageToChannel from "../../../../utils/discord/api/messages/send-message";

async function updateEachRepository(owner: string, name: string, installationId: number) {
    const getRepositoryRes = await makeDatabaseRequest(RepositoryEntity, "findOneBy", {
        owner: owner,
        name: name
    })
    if (getRepositoryRes.err || !getRepositoryRes.data) return
    const targetRepositoryId = getRepositoryRes.data.id
    await makeDatabaseRequest(RepositoryEntity, "update", targetRepositoryId, {
        installationId: String(installationId) 
    })
    const getTrackersRes = await makeDatabaseRequest(TrackerEntity, "findBy", {
        github_repository: {
            id: targetRepositoryId
        },
        register_status: RegisterStatus.PendingInstallation
    })
    if (getTrackersRes.err !== null) return
    getTrackersRes.data.map(async (tracker: TrackerEntity) => {
        const updateTrackerRes = await makeDatabaseRequest(TrackerEntity, "update", tracker.discord_channel_id, {
            register_status: RegisterStatus.Registered
        })
        if(updateTrackerRes.err !== null) {
            await discordSendMessageToChannel(tracker.discord_channel_id, {
                content: "Installation was detected, but an error in updating the channel status accured."
            })
            return
        }
        await discordSendMessageToChannel(tracker.discord_channel_id, {
            content: "Installation detected, registration successful."
        })
    })
}

export default async function githubHandleInstallationCreateEvent(data: InstallationCreatedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => await updateEachRepository(owner, repository.name, data.installation.id))
    return
}