import { InstallationSuspendEvent, Organization } from "@octokit/webhooks-types";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import iterateOnEveryTrackerOfRepository from "../../../general/iterate-on-every-tracker-of-repository";

async function trackerSuspendNotifyCallback(tracker: TrackerEntity) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is suspended. Bot operation is paused until installation becomes active again."
    })
}

export default async function githubHandleInstallationSuspendEvent(data: InstallationSuspendEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => {
        await iterateOnEveryTrackerOfRepository(owner, repository.name, trackerSuspendNotifyCallback)
    })
    return
}