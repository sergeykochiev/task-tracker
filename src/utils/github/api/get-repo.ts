import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../const/api/github.api"
import githubMakeRequest from "../github-request"

export default async function githubGetRepository(token: string, repoOwner: string, repoName: string) {
    return await githubMakeRequest<Repository>(GITHUB_ENDPOINTS.REPO(repoOwner, repoName).GET, token)
}