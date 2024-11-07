import { PullRequestReviewCommentCreatedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../utils/discord/api/messages/send-message";

export async function githubPullRequestReviewCommentOpenedCallback(tracker: TrackerEntity, data: PullRequestReviewCommentCreatedEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `A comment on the review of the pull request #${data.pull_request.number} titled \"${data.pull_request.title}\" was created by ${data.comment.user.login}!\n\nBody: ${data.comment.body}\n\n[Check the pull request](<${data.pull_request.html_url}>)`
    })
}