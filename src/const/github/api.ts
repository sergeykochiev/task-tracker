export const GITHUB_ENDPOINTS = {
    GET_REPO_BY_ID: (repoId: string) => `/repositories/${repoId}`,
    GET_ACCESS_TOKEN: (installId: string) => `/app/installations/${installId}}/access_tokens`,
    REPO: (owner: string, repo: string) => {
        const root = `/repos/${owner}/${repo}`
        return {
            HOOKS: root + "/hooks",
            INSTALLATION: root + "/installation",
            GET: root
        }
    }
} as const

export const GITHUB_API_ROOT = "https://api.github.com"

export const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql"

export const GITHUB_HEADERS = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
} as const