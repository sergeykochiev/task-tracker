enum GithubMacroAction {
    CreateIssue = "CREATE_ISSUE",
    CloseIssue = "CLOSE_ISSUE",
    OpenIssue = "OPEN_ISSUE",
    DeleteIssue = "DELETE_ISSUE",
    ReopenIssue = "REOPEN_ISSUE",
    LabelIssue = "LABEL_ISSUE",
    LabelIssueOverwrite = "LABEL_ISSUE_OVERWRITE",
    UnlabelIssue = "UNLABEL_ISSUE",
    LabelPullRequest = "LABEL_PULL_REQUEST",
    LabelPullRequestOverwrite = "LABEL_PULL_REQUEST_OVERWRITE",
    UnlabelPullRequest = "UNLABEL_PULL_REQUEST"
}

export default GithubMacroAction