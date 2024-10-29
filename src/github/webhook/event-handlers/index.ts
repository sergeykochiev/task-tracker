import GithubEventType from "../../enum/github/event-type";
import GithubWebhookEventHandlerArgs from "../../../types/utils/handle-github-webhook-event-args";
import githubHandleInstallationEvent from "./installation";
import githubHandleIssueCommentEvent from "./issue-comment";
import githubHandleIssuesEvent from "./issues";
import githubHandlelabelEvent from "./label";
import githubHandleMilestoneEvent from "./milestone";
import githubHandlePingEvent from "./ping";
import githubHandlePullRequestEvent from "./pull-request";
import githubHandlePullRequestReviewEvent from "./pull-request-review";
import githubHandlePullRequestReviewCommentEvent from "./pull-request-review-comment";
import githubHandlePullRequestReviewThreadEvent from "./pull-request-review-thread";

export default function githubHandleWebhookEvent(args: GithubWebhookEventHandlerArgs) {
    console.log("Received github webhook event:", args.eventType)
    switch(args.eventType) {
        case GithubEventType.Installation: githubHandleInstallationEvent(args.data); break
        case GithubEventType.Issues: githubHandleIssuesEvent(args.data); break
        case GithubEventType.IssueComment: githubHandleIssueCommentEvent(args.data); break
        case GithubEventType.Label: githubHandlelabelEvent(args.data); break
        case GithubEventType.Milestone: githubHandleMilestoneEvent(args.data); break
        case GithubEventType.Ping: githubHandlePingEvent(args.data); break
        case GithubEventType.PullRequest: githubHandlePullRequestEvent(args.data); break
        case GithubEventType.PullRequestReviewComment: githubHandlePullRequestReviewCommentEvent(args.data); break
        case GithubEventType.PullRequestReview: githubHandlePullRequestReviewEvent(args.data); break
        case GithubEventType.PullRequestReviewThread: githubHandlePullRequestReviewThreadEvent(args.data); break
    }
    return
}