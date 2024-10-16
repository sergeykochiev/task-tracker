import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../../../const/api/github.api"
import githubMakeRequest from "../github-request"

export default async function githubGetRepository(repoOwner: string, repoName: string, token?: string): Promise<Repository> {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.GET_REPO(repoOwner, repoName), token)).json()
}