import { IssuesMilestonedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/send-text-message-to-channel-with-refference";

export default async function githubHandleIssuesMilestonedEvent(data: IssuesMilestonedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `A new milestone was added the issue - ${data.milestone.title}!\n\nCheck the changes - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}