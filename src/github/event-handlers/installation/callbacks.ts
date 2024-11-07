import { InstallationCreatedEvent, InstallationDeletedEvent, InstallationSuspendEvent, InstallationUnsuspendEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import RegisterStatus from "../../../enum/register-status";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";
import GITHUB_APP_INSTALL_URL from "../../../const/github/new-install-url";

export async function githubInstallationCreatedCallback(tracker: TrackerEntity, data: InstallationCreatedEvent) {
    await TrackerEntity.update(tracker.discord_channel_id, {
        register_status: RegisterStatus.Registered
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Installation detected, registration successful."
    })
}

export async function githubInstallationDeletedCallback(tracker: TrackerEntity, data: InstallationDeletedEvent) {
    await TrackerEntity.update(tracker.discord_channel_id, {
        register_status: RegisterStatus.PendingInstallation
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `Owner of this repository uninstalled the Github App. To continue receiving updates, you need to [install](${GITHUB_APP_INSTALL_URL}) it again`,
        embeds: []
    })
}

export async function githubInstallationSuspendCallback(tracker: TrackerEntity, data: InstallationSuspendEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is suspended. Bot operation is paused until installation becomes active again."
    })
}

export async function githubInstallationUnsuspendCallback(tracker: TrackerEntity, data: InstallationUnsuspendEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is unsuspended. Bot operation is resumed."
    })
}