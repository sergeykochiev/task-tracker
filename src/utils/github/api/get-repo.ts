import { Repository } from "@octokit/webhooks-types"
import githubMakeRequest from "../github-request"
import { GITHUB_ENDPOINTS } from "../../../const/github/api"
import { Endpoints } from "@octokit/types"

export default async function githubGetRepository(token: string, repoOwner: string, repoName: string) {
    return await githubMakeRequest<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]>(GITHUB_ENDPOINTS.REPO(repoOwner, repoName).GET, token)
}