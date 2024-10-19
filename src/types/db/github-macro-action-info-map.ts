import GithubMacroAction from "../../db/enum/github-event-action";

interface GithubMacroActionInfoMap extends Record<GithubMacroAction, string | null> {
    [GithubMacroAction.CloseIssue]: null,
    [GithubMacroAction.CreateIssue]: null,
    [GithubMacroAction.DeleteIssue]: null,
    [GithubMacroAction.LabelIssue]: string,
    [GithubMacroAction.LabelIssueOverwrite]: string,
    [GithubMacroAction.LabelPullRequest]: string,
    [GithubMacroAction.LabelPullRequestOverwrite]: string,
    [GithubMacroAction.OpenIssue]: null,
    [GithubMacroAction.ReopenIssue]: null,
    [GithubMacroAction.UnlabelIssue]: string,
    [GithubMacroAction.UnlabelPullRequest]: string,
}

export default GithubMacroActionInfoMap