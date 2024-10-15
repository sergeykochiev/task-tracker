import { GITHUB_ENDPOINTS } from "../../../const/api/github.api";
import GithubRequest from "../github-request";
import { Repository } from "@octokit/webhooks-types"

export default async function githubListUserRepositories(token: string): Promise<Repository[]> {
    return await (await GithubRequest(GITHUB_ENDPOINTS.LIST_REPOS, token)).json()
}