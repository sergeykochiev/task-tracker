import { Response } from "express";
import GithubWebhookRequest from "../../types/github/webhook/request";
import GithubEventType from "../../enum/github/event-type";
import GithubIssueWebhookEventPayload from "../../types/github/webhook/payload/event/issues.event";
import GithubWebhookEventPayloadMap from "../../types/github/webhook/payload/payload-map";
import handleIssues from "./event-handlers/handle-issues";
import handleIssueComment from "./event-handlers/handle-issue-comment";
import handlelabel from "./event-handlers/handle-label";
import handleMilestone from "./event-handlers/handle-milestone";
import handlePing from "./event-handlers/handle-ping";
import handlePullRequest from "./event-handlers/handle-pull-request";
import handlePullRequestReviewComment from "./event-handlers/handle-pull-request-review-comment";
import handlePullRequestReview from "./event-handlers/handle-pull-request-review";
import handlePullRequestReviewThread from "./event-handlers/handle-pull-request-review-thread";

export default async function handleGithubWebhookCall(req: GithubWebhookRequest, res: Response) {
    
    switch(req.headers["X-GitHub-Event"]) {
        case GithubEventType.Issues: handleIssues(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.IssueComment: handleIssueComment(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.Label: handlelabel(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.Milestone: handleMilestone(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.Ping: handlePing(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.PullRequest: handlePullRequest(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.PullRequestReviewComment: handlePullRequestReviewComment(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.PullRequestReview: handlePullRequestReview(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
        case GithubEventType.PullRequestReviewThread: handlePullRequestReviewThread(req.body as GithubWebhookEventPayloadMap[typeof req.headers["X-GitHub-Event"]]); break
    }
    return
}