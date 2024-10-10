import { PullRequestReviewThreadEvent } from "@octokit/webhooks-types";

export default async function handlePullRequestReviewThread(data: PullRequestReviewThreadEvent) {
    switch(data.action) {
        case "resolved": break
        case "unresolved": break
    }
    return
}