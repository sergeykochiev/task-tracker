const GithubConst = {
    URL: {
        API_ROOT: "https://api.github.com",
        ENDPOINTS: {
            HOOKS: (owner: string, repo: string) => `/repos/${owner}/${repo}/hooks`,
            LIST_REPOS: "/user/repos",
            GET_REPO_BY_ID: (repoId: string) => `/repositories/${repoId}`,
<<<<<<< HEAD
            GET_REPO: (repoOwner: string, repoName: string) => `/repos/${repoOwner}/${repoName}`,
            EDIT_ORIGINAL_INTERACTION_RESPONSE: (appId: string, interactionToken: string) => `/webhooks/${appId}/${interactionToken}/messages/@original`
=======
            GET_REPO: (repoOwner: string, repoName: string) => `/repos/${repoOwner}/${repoName}`
>>>>>>> d4af1e04dd7ba2ca32181e9c8d8acd9b69838ce0
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