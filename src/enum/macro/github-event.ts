enum GithubMacroEvents {
    DependabotAlert_Created = "dependabot_alert/created",
    DependabotAlert_Reintroduced = "dependabot_alert/reintroduced",
    IssueComment_Created = "issue_comment/created",
    Issues_Opened = "issues/opened",
    Issues_Closed = "issues/closed",
    Issues_Labeled = "issues/labeled",
    Issues_Milestoned = "issues/milestoned",
    Issues_Reopened = "issues/reopened",
    PullRequest_Opened = "pull_request/opened",
    PullRequest_Closed = "pull_request/closed",
    PullRequest_Labeled = "pull_request/labeled",
    PullRequest_Milestoned = "pull_request/milestoned",
    PullRequest_Ready = "pull_request/ready_for_review",
    PullRequest_Reopened = "pull_request/reopened",
    PullRequest_ReviewRequested = "pull_request/review_requested",
    PullRequestReview_CommentCreated = "pull_request_review_comment",
    PullRequestReview_Submitted = "pull_request_review/submitted",
    PullRequestReview_Dismissed = "pull_request_review/dismissed",
}

export default GithubMacroEvents