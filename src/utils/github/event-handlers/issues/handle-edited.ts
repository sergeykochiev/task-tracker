import { IssuesEditedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/send-text-message-to-channel-with-refference";
import discordEditMessage from "../../../discord/api/messages/edit-message";
import discordGetMessage from "../../../discord/api/messages/get-message";

export default async function githubHandleIssuesEditedEvent(data: IssuesEditedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        const originalMessageObject = await discordGetMessage(originalMessage.tracker.discord_channel_id, originalMessage.id)
        await discordEditMessage(originalMessage.tracker.discord_channel_id, originalMessage.id, {
            content: `${originalMessageObject.content}\n\nEdit:\n\n${data.changes.body && `- New description: ${data.issue.body}\n${data.changes.body && `- New description: ${data.issue.body}`}`}\n${data.changes.title && `- New title: ${data.issue.title}`}`
        })
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was deleted!\n\nCheck the issue - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}