import { IssuesTransferredEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/routes/messages/send-text-message-to-channel-with-refference";

export default async function githubHandleIssuesTransferredEvent(data: IssuesTransferredEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was transferred to ${data.changes.new_repository}!\n\nCheck the changes - New issue - ${data.changes.new_issue.url}\n\n${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}