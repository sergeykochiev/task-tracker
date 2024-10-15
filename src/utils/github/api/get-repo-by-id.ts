import { Repository } from "@octokit/webhooks-types"
import githubMakeRequest from "../github-request"
import { GITHUB_ENDPOINTS } from "../../../const/api/github.api"

export default async function githubGetRepositoryById(id: string, token: string): Promise<Repository | null> {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.GET_REPO_BY_ID(id), token)).json()
}