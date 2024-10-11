import GithubConst from "../../../const/github/github";
import GithubHookCreateOptions from "../../../types/github/api/create-webhook/options";
import GithubWebhookCreateResponseData from "../../../types/github/api/create-webhook/response-data";
import GithubRequest from "../github-request";

export default async function githubCreateWebhook(repoOwner: string, repo: string, token: string, webhookOptions: GithubHookCreateOptions): Promise<GithubWebhookCreateResponseData | void> {
    const endpoint = GithubConst.URL.ENDPOINTS.HOOKS(repoOwner, repo);
    try {
        const res = await GithubRequest(endpoint, { method: 'POST', body: JSON.stringify(webhookOptions) }, token)
        return await res.json()
    } catch (err) {
        throw err
    }
}