import { IssueCommentCreatedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";

export async function githubIssueCommentCreatedCallback(tracker: TrackerEntity, data: IssueCommentCreatedEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `An issue comment was created by ${data.comment.user.login}!\n\nBody: ${data.comment.body}\n\n[Check the issue](<${data.issue.html_url}>)`
    })
}