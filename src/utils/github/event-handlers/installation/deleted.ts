import { InstallationDeletedEvent, Organization } from "@octokit/webhooks-types";
import iterateOnEveryTrackerOfRepository from "../../../general/iterate-on-every-tracker-of-repository";
import { databaseDeleteInstallation } from "../../../db/installation";
import { log } from "console";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import GITHUB_APP_INSTALL_URL from "../../../../const/github/new-install-url";
import { databaseUpdateTrackerStatus } from "../../../db/tracker";
import RegisterStatus from "../../../../db/enum/register-status";

async function trackerDeleteNotifyCallback(tracker: TrackerEntity) {
    await databaseUpdateTrackerStatus(tracker.discord_channel_id, RegisterStatus.PendingInstallation)
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `Owner of this repository uninstalled the Github App. To continue receiving updates, you need to [install](${GITHUB_APP_INSTALL_URL}) it again`,
        embeds: []
    })
}

export default async function githubHandleInstallationDeletedEvent(data: InstallationDeletedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const deleteInstallationRes = await databaseDeleteInstallation(String(data.installation.id))
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