import GithubConst from "../../const/github";
import GithubHookCreateOptions from "../../types/github/webhook/create-options";
import GithubRequest from "./github-request";

export default async function CreateGithubWebhook(repoOwner: string, repo: string, webhookOptions: GithubHookCreateOptions) {
    const endpoint = GithubConst.URL.ENDPOINTS.HOOKS(repoOwner, repo);
    try {
        await GithubRequest(endpoint, { method: 'POST', body: JSON.stringify(webhookOptions) });
    } catch (err) {
        console.error(err);
    }
}