import { Repository } from "@octokit/webhooks-types"
import githubMakeRequest from "../github-request"
import { GITHUB_ENDPOINTS } from "../../../const/api/github.api"
import { GITHUB_ENDPOINTS } from "../../../const/api/github.api"

export default async function githubGetRepository(repoOwner: string, repoName: string, token?: string): Promise<Repository> {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.GET_REPO(repoOwner, repoName), token)).json()
}