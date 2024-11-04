import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import RepositoryEntity from "../../../db/entity/repository.entity";
import TrackerEntity from "../../../db/entity/tracker.entity";
import RegisterStatus from "../../../enum/register-status";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";
import { wrapErrorAsync } from "../../../utils/general/error-wrapper";

async function updateEachRepository(owner: string, name: string, installationId: number) {
    const getRepositoryRes = await RepositoryEntity.findOneBy({
        owner: owner,
        name: name
    })
    if (!getRepositoryRes) return
    const targetRepositoryId = getRepositoryRes.id
    await RepositoryEntity.update(targetRepositoryId, {
        installationId: String(installationId) 
    })
    const getTrackersRes = await TrackerEntity.findBy({
        github_repository: {
            id: targetRepositoryId
        },
        register_status: RegisterStatus.PendingInstallation
    })
    getTrackersRes.map(async (tracker: TrackerEntity) => {
        const updateTrackerRes = await wrapErrorAsync(() => TrackerEntity.update(tracker.discord_channel_id, {
            register_status: RegisterStatus.Registered
        }))
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