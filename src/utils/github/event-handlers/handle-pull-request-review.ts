import { PullRequestReviewEvent } from "@octokit/webhooks-types";

export default async function githubHandlePullRequestReviewEvent(data: PullRequestReviewEvent) {
    switch(data.action) {
        case "dismissed": break
        case "edited": break
        case "submitted": break
    }
    return
}