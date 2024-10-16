import { IssuesClosedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/routes/messages/send-text-message-to-channel-with-refference";

export default async function githubHandleIssuesClosedEvent(data: IssuesClosedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was closed!\n\nCheck the changes - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}