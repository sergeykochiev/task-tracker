export const GITHUB_ENDPOINTS = {
    GET_ACCESS_TOKEN: (installId: number) => `/app/installations/${installId}}/access_tokens`,
    REPO: (fullname: string) => {
        const root = `/repos/${fullname}`
        return {
            HOOKS: root + "/hooks",
            INSTALLATION: root + "/installation",
            SELF: root,
            LABELS: root + "/labels",
            ISSUES: (number: number) => {
                const root = `/repos/${fullname}/issues/${number}`
                return {
                    LABELS: {
                        SELF: root + "/labels",
                        BY_NAME: (name: string) => root + "/labels/" + name
                    },
                    SELF: root
                }
            },
        }
    }
} as const

export const GITHUB_API_ROOT = "https://api.github.com"

export const GITHUB_HEADERS = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
} as const