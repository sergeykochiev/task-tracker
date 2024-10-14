import { IssuesDeletedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/send-text-message-to-channel-with-refference";

export default async function githubHandleIssuesDeletedEvent(data: IssuesDeletedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was deleted!\n\nCheck the issue - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}