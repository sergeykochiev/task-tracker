import GithubEventType from "../../enum/github/event-type";

export const GITHUB_DEFAULT_WEBHOOK_EVENTS = [
    GithubEventType.Issues,
    GithubEventType.IssueComment,
    GithubEventType.Label,
    GithubEventType.Milestone,
    GithubEventType.Ping,
    GithubEventType.PullRequest,
    GithubEventType.PullRequestReviewComment,
    GithubEventType.PullRequestReview,
    GithubEventType.PullRequestReviewThread
]