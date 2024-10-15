import GithubConfig from "../../config/env/github.config";

export default function generateNewWebhookSecret(): string {
    return GithubConfig.WEBHOOK_SECRET
}