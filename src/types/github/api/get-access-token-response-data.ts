import { Repository } from "@octokit/webhooks-types"

interface GithubApiAccessTokenResponseData {
    token: string,
    expires_at: string
    permissions: Record<string, "write" | "read">
    repository_selection: string
    repositories: Repository[]
}

export default GithubApiAccessTokenResponseData