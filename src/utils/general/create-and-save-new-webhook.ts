import AppConfig from "../../config/env/app.config"
import GITHUB_DEFAULT_WEBHOOK_EVENTS from "../../const/github/default-webhook-events"
import generateNewWebhookSecret from "./generate-new-webhook-secret"
import githubCreateWebhook from "../github/api/create-webhook"
import dbGetRepositoryById, { dbUpdateRepository } from "../db/repository"

export default async function createAndSaveNewGithubWebhookForRepository(repoId: string) {
    const webhookSecret = generateNewWebhookSecret()
    const targetRepo = await dbGetRepositoryById(repoId)
    if (!targetRepo) throw new Error("No repository found in database")
    if (!targetRepo.github_token) throw new Error("No token found in database")
    const targetWebhook = await githubCreateWebhook(targetRepo.owner, targetRepo.name, targetRepo.github_token, {
        name: "web",
        config: {
            url: `${AppConfig.HOST}/${targetRepo.slug}`,
            content_type: "application/json",
            secret: webhookSecret,
            insecure_ssl: 0
        },
        events: GITHUB_DEFAULT_WEBHOOK_EVENTS,
        active: true
    })
    if (!targetWebhook) throw new Error("Couldn't create webhook")
    await dbUpdateRepository(repoId, {
        webhook_id: targetWebhook.id,
        webhook_secret: webhookSecret,
    })
    return
}