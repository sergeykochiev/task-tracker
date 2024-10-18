import { IssuesLockedEvent } from "@octokit/webhooks-types";
import mapThroughIssueMessages from "../../../general/map-through-issue-messages";
import OriginalMessageEntity from "../../../../db/entity/original-message.entity";
import discordIssueEventNotifyWithRef from "../../../discord/issue-event-notify-with-ref";
import { log } from "console";

export default async function githubHandleIssuesLockedEvent(data: IssuesLockedEvent) {
    await mapThroughIssueMessages(data.issue.id, async (originalMessage: OriginalMessageEntity) => {
        const res = await discordIssueEventNotifyWithRef(originalMessage, data.action)
        if (res.err) log(res.err)
    })
    return
}