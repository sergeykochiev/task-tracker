import GithubMacroEvents from "../../../enum/macro/github-event";

const DEFAULT_ACTIONS = [
    {
        name: "default_ic_c",
        event: GithubMacroEvents.IssueComment_Created,
        info: "An issue comment was {action} by {comment.user.login}!\n\nBody: {comment.body}\n\n[Check the issue](<{issue.html_url}>)"
    },
    {
        name: "default_i_o",
        event: GithubMacroEvents.Issues_Opened,
        info: "An issue #{issue.number} titled \"{issue.title}\" was {action} by {issue.user.login}!\n\nDescription: {issue.body}\n\n[Check the issue](<{issue.html_url}>)"
    },
    {
        name: "default_pr_o",
        event: GithubMacroEvents.PullRequest_Opened,
        info: "A pull request #{number} titled \"{pull_request.title}\" was {action} by {pull_request.user.login}!\n\nDescription: {pull_request.body}\n\n[Check the pull request](<{pull_request.html_url}>)"
    },
    {
        name: "default_pr_rr",
        event: GithubMacroEvents.PullRequest_ReviewRequested,
        info: "A review requested on pull request #{number} titled \"{pull_request.title}\"!\n\n[Check the pull request(<{pull_request.html_url}>)"
    }    
] as const

export default DEFAULT_ACTIONS