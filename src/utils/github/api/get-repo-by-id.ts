import { Repository } from "@octokit/webhooks-types"
import GithubConst from "../../../const/github/github"
import githubMakeRequest from "../github-request"

export default async function githubGetRepositoryById(id: string, token: string): Promise<Repository | null> {
    const endpoint = GithubConst.URL.ENDPOINTS.GET_REPO_BY_ID(id)
    try {
        const res = await githubMakeRequest(endpoint, { method: 'GET' }, token)
        return await res.json()
    } catch (err) {
        throw err
    }
}