import { InstallationCreatedEvent, InstallationDeletedEvent, InstallationSuspendEvent, InstallationUnsuspendEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../utils/discord/send-message";

export async function githubInstallationCreatedCallback(tracker: TrackerEntity, data: InstallationCreatedEvent) {
    await TrackerEntity.update(tracker.discord_channel_id, {
        is_app_installed: true
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Installation detected, registration successful."
    })
}

export async function githubInstallationDeletedCallback(tracker: TrackerEntity, data: InstallationDeletedEvent) {
    await TrackerEntity.delete(tracker.discord_channel_id)
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `Owner of this repository uninstalled the Github App, channel automatically unregistered`,
    })
}

export async function githubInstallationSuspendCallback(tracker: TrackerEntity, data: InstallationSuspendEvent) {
    await TrackerEntity.update(tracker.discord_channel_id, {
        is_app_installed: false
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is suspended. Bot operation is paused until installation becomes active again."
    })
}

export async function githubInstallationUnsuspendCallback(tracker: TrackerEntity, data: InstallationUnsuspendEvent) {
    await TrackerEntity.update(tracker.discord_channel_id, {
        is_app_installed: true
    })
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: "Current app installation on this repository is unsuspended. Bot operation is resumed."
    })
}