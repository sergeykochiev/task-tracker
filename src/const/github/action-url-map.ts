import GithubActions from "../../enum/macro/github-action"

const LABEL_API = {
    url: (owner: string, repo: string, id: number | undefined) => `/repos/${owner}/${repo}/issues/${id}/labels`,
    method: "POST",
}

const GITHUB_ACTION_TO_URL_MAP: Record<GithubActions, {
    url: (owner: string, repo: string, id?: number) => string,
    method: string
}> = {
    [GithubActions.CloseIssue]: {
        url: (owner, repo, id) => `/repos/${owner}/${repo}/issues/${id}`,
        method: "PATCH"
    },
    [GithubActions.CreateIssue]: {
        url: (owner, repo) => `/repos/${owner}/${repo}/issues`,
        method: "POST"
    },
    [GithubActions.AddLabelsToIssueOrPR]: LABEL_API,
    [GithubActions.RemoveLabelFromIssueOrPR]: LABEL_API,
    [GithubActions.SetLabelsOfIssueOrPR]: LABEL_API,
    [GithubActions.ReopenIssue]: {
        url: (owner, repo, id) => `/repos/${owner}/${repo}/issues/${id}`,
        method: "PATCH"
    }
}

export default GITHUB_ACTION_TO_URL_MAP