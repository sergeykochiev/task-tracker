import { IssuesEditedEvent } from "@octokit/webhooks-types";
import discordEditMessage from "../../../discord/api/routes/messages/edit-message";
import discordGetMessage from "../../../discord/api/routes/messages/get-message";
import OriginalMessageEntity from "../../../../db/entity/original-message.entity";
import mapThroughIssueMessages from "../../../general/map-through-issue-messages";
import discordIssueEventNotifyWithRef from "../../../discord/issue-event-notify-with-ref";

export default async function githubHandleIssuesEditedEvent(data: IssuesEditedEvent) {
    mapThroughIssueMessages(data.issue.id, async (originalMessage: OriginalMessageEntity) => {
        const originalMessageRes = await discordGetMessage(originalMessage.tracker.discord_channel_id, originalMessage.id)
        if (originalMessageRes.err || !originalMessageRes.data.ok) return
        await discordEditMessage(originalMessage.tracker.discord_channel_id, originalMessage.id, {
            content: `${originalMessageRes.data.data.content}\n\nEdit:\n\n${data.changes.body && `- New description: ${data.issue.body}\n${data.changes.body && `- New description: ${data.issue.body}`}`}\n${data.changes.title && `- New title: ${data.issue.title}`}`
        })
        await discordIssueEventNotifyWithRef(originalMessage, "deleted")
    })
    return
}