import { PushEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendNotificationToChannel from "../../../utils/discord/send-notification";

export async function githubPushCallback(tracker: TrackerEntity, data: PushEvent) {
    await discordSendNotificationToChannel(tracker.discord_channel_id, {
        title: "Somebody pushed something",
        content: `Push happenned`,
        role_to_ping: tracker.role_to_ping
    })
}