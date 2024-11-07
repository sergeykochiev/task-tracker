import { PushEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";

export async function githubPushCallback(tracker: TrackerEntity, data: PushEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `Push happenned`
    })
}