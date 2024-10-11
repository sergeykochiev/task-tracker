import GithubConst from "../../../const/github/github";
import GithubRequest from "../github-request";
import { Repository } from "@octokit/webhooks-types"

export default async function githubListUserRepositories(token: string): Promise<Repository[]> {
    const endpoint = GithubConst.URL.ENDPOINTS.LIST_REPOS
    try {
        const res = await GithubRequest(endpoint, { method: 'GET' }, token)
        return await res.json()
    } catch (err) {
        throw err
    }
}