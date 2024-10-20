import { Repository } from "@octokit/webhooks-types"
import { GITHUB_ENDPOINTS } from "../../const/api/github.api"
import githubMakeRequest from "../../utils/github/github-request"
export default async function githubGetRepositoryById(id: string, token: string) {
    return await githubMakeRequest<Repository | null>(GITHUB_ENDPOINTS.GET_REPO_BY_ID(id), token)
}