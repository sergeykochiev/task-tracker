import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";
import discordSendNotificationToChannel from "../../../utils/discord/send-notification";

export async function githubIssuesOpenedCallback(tracker: TrackerEntity, data: IssuesOpenedEvent) {
    console.log("GITHUB ISSUES OPENED callback")
    await discordSendNotificationToChannel(tracker.discord_channel_id, {
        title: "New issue opened",
        content: `An issue #${data.issue.number} titled \"${data.issue.title}\" was opened by ${data.issue.user.login}!\n\nDescription: ${data.issue.body}\n\n[Check the issue](<${data.issue.html_url}>)`
    })
}