import { IssuesPinnedEvent } from "@octokit/webhooks-types";
import { dbBulkGetOriginalMessagesByIssueId } from "../../../db/original-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/send-text-message-to-channel-with-refference";
import discordChangeMessagePinState from "../../../discord/api/change-message-pin-state";

export default async function githubHandleIssuesPinnedEvent(data: IssuesPinnedEvent) {
    const originalMessages = await dbBulkGetOriginalMessagesByIssueId(String(data.issue.id))
    originalMessages.map(async (originalMessage) => {
        await discordChangeMessagePinState(originalMessage.tracker.discord_channel_id, originalMessage.id, true)
        await discordSendTextMessageToChannelWithRefference(originalMessage.tracker.discord_channel_id, `An issue was pinned!\n\nCheck the changes - ${originalMessage.issue.url}`, originalMessage.id)
    })
    return
}