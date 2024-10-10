import { IssuesEvent } from "@octokit/webhooks-types";
import GithubIssueAction from "../../../enum/github/issue-action";
import githubHandleIssuesOpenedEvent from "./issues/handle-opened";

export default async function githubHandleIssuesEvent(data: IssuesEvent) {
    console.log("Handling issues", data.action, "event")
    switch(data.action) {
        case GithubIssueAction.Assigned: break
        case GithubIssueAction.Closed: break
        case GithubIssueAction.Deleted: break
        case GithubIssueAction.Demilestoned: break
        case GithubIssueAction.Edited: break
        case GithubIssueAction.Labeled: break
        case GithubIssueAction.Locked: break
        case GithubIssueAction.Milestoned: break
        case GithubIssueAction.Opened: githubHandleIssuesOpenedEvent(data)
        case GithubIssueAction.Pinned: break
        case GithubIssueAction.Reopened: break
        case GithubIssueAction.Transferred: break
        case GithubIssueAction.Unassigned: break
        case GithubIssueAction.Unlabeled: break
        case GithubIssueAction.Unlocked: break
        case GithubIssueAction.Unpinned: break
    }
    return
}