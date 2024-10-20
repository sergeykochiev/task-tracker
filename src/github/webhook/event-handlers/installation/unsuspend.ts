import { InstallationUnsuspendEvent, Organization } from "@octokit/webhooks-types";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../../discord/api/messages/send-message";
import iterateOnEveryTrackerOfRepository from "../../../../utils/general/iterate-on-every-tracker-of-repository";

async function trackerUnsuspendNotifyCallback(tracker: TrackerEntity) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is unsuspended. Bot operation is resumed."
    })
}

export default async function githubHandleInstallationUnsuspendEvent(data: InstallationUnsuspendEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => {
        await iterateOnEveryTrackerOfRepository(owner, repository.name, trackerUnsuspendNotifyCallback)
    })
    return
}