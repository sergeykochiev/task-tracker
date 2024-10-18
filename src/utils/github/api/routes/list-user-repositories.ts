import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../../const/api/github.api"
import githubMakeRequest from "../github-request"

export default async function githubListUserRepositories(token: string) {
    return await githubMakeRequest<Repository[]>(GITHUB_ENDPOINTS.LIST_REPOS, token)
}