const GithubConst = {
    URL: {
        API_ROOT: "https://api.github.com",
        ENDPOINTS: {
            HOOKS: (owner: string, repo: string) => `/repos/${owner}/${repo}/hooks`,
            LIST_REPOS: "/user/repos",
            GET_REPO_BY_ID: (repoId: string) => `/repositories/${repoId}`,
            GET_REPO: (repoOwner: string, repoName: string) => `/repos/${repoOwner}/${repoName}`,
            EDIT_ORIGINAL_INTERACTION_RESPONSE: (appId: string, interactionToken: string) => `/webhooks/${appId}/${interactionToken}/messages/@original`
        }
    },
    AUTH_HEADERS: (accessToken: string) => {
        return {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${accessToken}`,
            "X-GitHub-Api-Version": "2022-11-28"
        }
    }
}

export default GithubConst