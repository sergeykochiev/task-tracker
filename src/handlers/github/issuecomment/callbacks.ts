import { IssueCommentCreatedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendNotificationToChannel from "../../../utils/discord/send-notification";

export async function githubIssueCommentCreatedCallback(tracker: TrackerEntity, data: IssueCommentCreatedEvent) {
    await discordSendNotificationToChannel(tracker.discord_channel_id, {
        title: "New issue comment created",
        content: `An issue comment was created by ${data.comment.user.login}!\n\nBody: ${data.comment.body}\n\n[Check the issue](<${data.issue.html_url}>)`,
        role_to_ping: tracker.role_to_ping
    })
}