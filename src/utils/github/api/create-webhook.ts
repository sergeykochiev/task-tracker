import { GITHUB_ENDPOINTS } from "../../../const/api/github.api";
import GithubHookCreateOptions from "../../../types/github/api/create-webhook/options";
import GithubWebhookCreateResponseData from "../../../types/github/api/create-webhook/response-data";
import GithubRequest from "../github-request";

export default async function githubCreateWebhook(repoOwner: string, repoName: string, token: string, webhookOptions: GithubHookCreateOptions): Promise<GithubWebhookCreateResponseData> {
    return await (await GithubRequest(GITHUB_ENDPOINTS.HOOKS(repoOwner, repoName), token, { method: 'POST', body: webhookOptions })).json()
}