import { PullRequestOpenedEvent, PullRequestReviewRequestedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendMessageToChannel from "../../../utils/discord/send-message";

export async function githubPullRequestOpenedCallback(tracker: TrackerEntity, data: PullRequestOpenedEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `A pull request #${data.number} titled \"${data.pull_request.title}\" was ${data.action} by ${data.pull_request.user.login}!\n\nDescription: ${data.pull_request.body}\n\n[Check the pull request](<${data.pull_request.html_url}>)`
    })
}

export async function githubPullRequestReviewRequestedCallback(tracker: TrackerEntity, data: PullRequestReviewRequestedEvent) {
    await discordSendMessageToChannel(tracker.discord_channel_id, {
        content: `A review on the pull request #${data.number} titled \"${data.pull_request.title}\" was requested by ${data.pull_request.user.login}!\n\nDescription: ${data.pull_request.body}\n\n[Check the pull request](<${data.pull_request.html_url}>)`
    })
}