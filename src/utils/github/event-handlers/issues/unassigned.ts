import { IssuesUnassignedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/routes/messages/send-text-message-to-channel-with-refference";

export default async function githubHandleIssuesUnassignedEvent(data: IssuesUnassignedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was unassigned!\n\nCheck the changes - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}