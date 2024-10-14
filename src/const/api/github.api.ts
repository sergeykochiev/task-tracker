export const GITHUB_ENDPOINTS = {
    HOOKS: (owner: string, repo: string) => `/repos/${owner}/${repo}/hooks`,
    LIST_REPOS: "/user/repos",
    GET_REPO_BY_ID: (repoId: string) => `/repositories/${repoId}`,
    GET_REPO: (owner: string, repo: string) => `/repos/${owner}/${repo}`,
    GET_INSTALL_ID_BY_REPO: (owner: string, repo: string) => `/repos/{${owner}}/${repo}/installation`,
    GET_ACCESS_TOKEN: (installId: string) => `/app/installations/${installId}}/access_tokens`
} as const

export const GITHUB_API_ROOT = "https://api.github.com"

export const GITHUB_HEADERS = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
} as const