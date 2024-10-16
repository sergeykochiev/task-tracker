import { IssuesEvent } from "@octokit/webhooks-types";
import githubHandleIssuesOpenedEvent from "./opened";
import githubHandleIssuesAssignedEvent from "./assigned";
import githubHandleIssuesClosedEvent from "./closed";
import githubHandleIssuesDeletedEvent from "./deleted";
import githubHandleIssuesEditedEvent from "./edited";
import githubHandleIssuesLabeledEvent from "./labeled";
import githubHandleIssuesLockedEvent from "./locked";
import githubHandleIssuesMilestonedEvent from "./milestoned";
import githubHandleIssuesPinnedEvent from "./pinned";
import githubHandleIssuesReopenedEvent from "./reopened";
import githubHandleIssuesTransferredEvent from "./transferred";
import githubHandleIssuesUnassignedEvent from "./unassigned";
import githubHandleIssuesUnlabeledEvent from "./unlabeled";
import githubHandleIssuesUnlockedEvent from "./unlocked";
import githubHandleIssuesUnpinnedEvent from "./unpinned";

export default function githubHandleIssuesEvent(data: IssuesEvent) {
    console.log("Handling issues", data.action, "event")
    switch(data.action) {
        case "assigned": githubHandleIssuesAssignedEvent(data); break
        case "closed": githubHandleIssuesClosedEvent(data); break
        case "deleted": githubHandleIssuesDeletedEvent(data); break
        case "demilestoned": break
        case "edited": githubHandleIssuesEditedEvent(data); break
        case "labeled": githubHandleIssuesLabeledEvent(data); break
        case "locked": githubHandleIssuesLockedEvent(data); break
        case "milestoned": githubHandleIssuesMilestonedEvent(data); break
        case "opened": githubHandleIssuesOpenedEvent(data); break
        case "pinned": githubHandleIssuesPinnedEvent(data); break
        case "reopened": githubHandleIssuesReopenedEvent(data); break
        case "transferred": githubHandleIssuesTransferredEvent(data); break
        case "unassigned": githubHandleIssuesUnassignedEvent(data); break
        case "unlabeled": githubHandleIssuesUnlabeledEvent(data); break
        case "unlocked": githubHandleIssuesUnlockedEvent(data); break
        case "unpinned": githubHandleIssuesUnpinnedEvent(data); break
    }
    return
}