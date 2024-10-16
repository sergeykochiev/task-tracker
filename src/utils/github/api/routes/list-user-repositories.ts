import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../../const/api/github.api"
import githubMakeRequest from "../github-request"

export default async function githubListUserRepositories(token: string): Promise<Repository[]> {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.LIST_REPOS, token)).json()
}