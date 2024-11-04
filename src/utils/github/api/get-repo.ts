import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../const/github/api"
import { Endpoints } from "@octokit/types"
import githubGetAuthHeaders from "../get-auth-headers"
import TypedResponse from "../../../types/typed-response"

export default async function githubGetRepository(token: string, repoOwner: string, repoName: string): Promise<TypedResponse<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]>> {
    return await fetch(GITHUB_ENDPOINTS.REPO(repoOwner, repoName).GET, {
        headers: githubGetAuthHeaders(token)
    })
}