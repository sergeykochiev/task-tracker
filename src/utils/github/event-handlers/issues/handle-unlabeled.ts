import { IssuesUnlabeledEvent } from "@octokit/webhooks-types";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/send-text-message-to-channel-with-refference";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";

export default async function githubHandleIssuesUnlabeledEvent(data: IssuesUnlabeledEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `A new label was removed from the issue${data.label && ` - ${data.label.name}`}!\n\nCheck the changes - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}