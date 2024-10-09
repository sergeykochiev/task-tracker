import GithubEventType from "../../enum/github/event-type";
import GithubWebhookEventHandlerArgs from "../../types/utils/handle-github-webhook-event-args";
import handleIssueComment from "./event-handlers/handle-issue-comment";
import handleIssues from "./event-handlers/handle-issues";
import handlelabel from "./event-handlers/handle-label";
import handleMilestone from "./event-handlers/handle-milestone";
import handlePing from "./event-handlers/handle-ping";
import handlePullRequest from "./event-handlers/handle-pull-request";
import handlePullRequestReview from "./event-handlers/handle-pull-request-review";
import handlePullRequestReviewComment from "./event-handlers/handle-pull-request-review-comment";
import handlePullRequestReviewThread from "./event-handlers/handle-pull-request-review-thread";

export default function handleGithubWebhookEvent(args: GithubWebhookEventHandlerArgs) {
    switch(args.eventType) {
        case GithubEventType.Issues: handleIssues(args.data); break
        case GithubEventType.IssueComment: handleIssueComment(args.data); break
        case GithubEventType.Label: handlelabel(args.data); break
        case GithubEventType.Milestone: handleMilestone(args.data); break
        case GithubEventType.Ping: handlePing(args.data); break
        case GithubEventType.PullRequest: handlePullRequest(args.data); break
        case GithubEventType.PullRequestReviewComment: handlePullRequestReviewComment(args.data); break
        case GithubEventType.PullRequestReview: handlePullRequestReview(args.data); break
        case GithubEventType.PullRequestReviewThread: handlePullRequestReviewThread(args.data); break
    }
    return
}