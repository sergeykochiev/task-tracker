import { IssuesPinnedEvent } from "@octokit/webhooks-types";
import discordChangeMessagePinState from "../../../../utils/discord/api/messages/change-message-pin-state";
import mapThroughIssueMessages from "../../../../utils/general/map-through-issue-messages";
import OriginalMessageEntity from "../../../../db/entity/original-message.entity";
import discordIssueEventNotifyWithRef from "../../../../utils/discord/issue-event-notify-with-ref";
import { log } from "console";

export default async function githubHandleIssuesPinnedEvent(data: IssuesPinnedEvent) {
    await mapThroughIssueMessages(data.issue.id, async (originalMessage: OriginalMessageEntity) => {
        const res1 = await discordChangeMessagePinState(originalMessage.tracker.discord_channel_id, originalMessage.id, true)
        if (res1.err) {
            log(res1.err)
            return
        }
        const res2 = await discordIssueEventNotifyWithRef(originalMessage, data.action)
        if (res2.err) log(res2.err)
    })
    return
}