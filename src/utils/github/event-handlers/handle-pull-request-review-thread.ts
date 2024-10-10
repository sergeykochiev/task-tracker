import { PullRequestReviewThreadEvent } from "@octokit/webhooks-types";

export default async function githubHandlePullRequestReviewThreadEvent(data: PullRequestReviewThreadEvent) {
    switch(data.action) {
        case "resolved": break
        case "unresolved": break
    }
    return
}