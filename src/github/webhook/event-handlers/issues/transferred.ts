import { IssuesTransferredEvent } from "@octokit/webhooks-types";
import OriginalMessageEntity from "../../../../db/entity/original-message.entity";
import mapThroughIssueMessages from "../../../../utils/general/map-through-issue-messages";
import discordIssueEventNotifyWithRef from "../../../../utils/discord/issue-event-notify-with-ref";
import { log } from "console";

export default async function githubHandleIssuesTransferredEvent(data: IssuesTransferredEvent) {
    await mapThroughIssueMessages(data.issue.id, async (originalMessage: OriginalMessageEntity) => {
        const res = await discordIssueEventNotifyWithRef(originalMessage, data.action)
        if (res.err) log(res.err)
    })
    return
}