import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../const/github/api"
import { Endpoints } from "@octokit/types"
import githubGetAuthHeaders from "../get-auth-headers"
import TypedResponse from "../../../types/typed-response"

export default async function githubGetRepository(token: string, fullname: string): Promise<TypedResponse<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]>> {
    return await fetch(GITHUB_ENDPOINTS.REPO(fullname).SELF, {
        headers: githubGetAuthHeaders(token)
    })
}