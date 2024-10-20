import { PullRequestEvent } from "@octokit/webhooks-types";

export default async function githubHandlePullRequestEvent(data: PullRequestEvent) {
    switch(data.action) {
        case "assigned": break
        case "auto_merge_disabled": break
        case "auto_merge_enabled": break
        case "closed": break
        case "converted_to_draft": break
        case "demilestoned": break
        case "dequeued": break
        case "edited": break
        case "enqueued": break
        case "labeled": break
        case "locked": break
        case "milestoned": break
        case "opened": break
        case "ready_for_review": break
        case "reopened": break
        case "review_request_removed": break
        case "review_requested": break
        case "synchronize": break
        case "unassigned": break
        case "unlabeled": break
        case "unlocked": break
    }
    return
}