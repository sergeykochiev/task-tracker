import { PullRequestReviewCommentEvent } from "@octokit/webhooks-types";

export default async function handlePullRequestReviewComment(data: PullRequestReviewCommentEvent) {
    switch(data.action) {
        case "created": break
        case "deleted": break
        case "edited": break
    }
    return
}