import GithubActions from "../../enum/macro/github-action"

const GITHUB_ACTION_TO_URL_MAP: Record<GithubActions, (owner: string, repo: string, id?: number) => string> = {
    [GithubActions.CloseIssue]: (owner, repo) => "",
    [GithubActions.CreateIssue]: (owner, repo) => `/repos/${owner}/${repo}/issues`,
    [GithubActions.LabelIssue]: (owner, repo, id) => `/repos/${owner}/${repo}/issues/${id}/labels`,
    [GithubActions.LabelPullRequest]: (owner, repo) => "",
    [GithubActions.ReopenIssue]: (owner, repo) => "",
}

export default GITHUB_ACTION_TO_URL_MAP