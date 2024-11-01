import { InstallationDeletedEvent, Organization } from "@octokit/webhooks-types";
import { log } from "console";
import GITHUB_APP_INSTALL_URL from "../../../const/github/new-install-url";
import TrackerEntity from "../../../db/entity/tracker.entity";
import RegisterStatus from "../../../enum/register-status";
import { makeDatabaseRequest } from "../../../utils/db/repository-request";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";

async function trackerDeleteNotifyCallback(tracker: TrackerEntity) {
    await makeDatabaseRequest(TrackerEntity, "update", tracker.discord_channel_id, {
        register_status: RegisterStatus.PendingInstallation
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `Owner of this repository uninstalled the Github App. To continue receiving updates, you need to [install](${GITHUB_APP_INSTALL_URL}) it again`,
        embeds: []
    })
}

export default async function githubHandleInstallationDeletedEvent(data: InstallationDeletedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const deleteInstallationRes = await makeDatabaseRequest(TrackerEntity, "delete", String(data.installation.id))
    if (deleteInstallationRes.err) {
        log(deleteInstallationRes.err)
        return
    }
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => {
        await iterateOnEveryTrackerOfRepository(owner, repository.name, trackerDeleteNotifyCallback)
    })
    return
}