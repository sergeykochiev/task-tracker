import { APIModalSubmitInteraction } from "discord-api-types/v10"
import TrackerEntity from "../../db/entity/tracker.entity"
import GithubConfig from "../../config/env/github.config"
import AppConfig from "../../config/env/app.config"
import GITHUB_DEFAULT_WEBHOOK_EVENTS from "../../const/github/default-webhook-events"
import githubCreateWebhook from "../github/api/create-webhook"
import RegistrationFailedError from "../../error/app/registration-failed.error"
import dbUpdateRepositoryCredentials from "../db/update-repository-credentials"
import ApiRequestError from "../../error/app/request.error"
import discordReplyToInteractionWithText from "./api/send-plain-text-as-interaction-reply"
import DatabaseError from "../../error/db/database.error"

export default async function discordHandleRegistrationAddToken(data: APIModalSubmitInteraction, tracker: TrackerEntity) {
    const githubToken = data.data.components[0].components[0].value
    try {
        const webhookSecret = GithubConfig.WEBHOOK_SECRET
        const [targetRepositoryOwner, targetRepositoryName] = [tracker.github_repository.owner, tracker.github_repository.name]
        const targetWebhook = await githubCreateWebhook(targetRepositoryOwner, targetRepositoryName, githubToken, {
            name: "web",
            config: {
                url: `${AppConfig.HOST}/${tracker.github_repository.slug}`,
                content_type: "application/json",
                secret: webhookSecret,
                insecure_ssl: 0
            },
            events: GITHUB_DEFAULT_WEBHOOK_EVENTS,
            active: true
        })
        if (!targetWebhook) throw new RegistrationFailedError("Error creating webhook")
        await dbUpdateRepositoryCredentials(tracker.github_repository.id, {
            webhook_id: targetWebhook.id,
            webhook_secret: webhookSecret,
            github_token: githubToken
        })
        // await discordSendMessageToChannel(data.channel_id, {
        //     content: "Almost done! Now choose the repository you want to track events from:",
        //     components: [
        //         {
        //             type: ComponentType.ActionRow,
        //             components: [
        //                 {
        //                     type: ComponentType.StringSelect,
        //                     custom_id: `repository_select_${data.timestamp}`,
        //                     options: repoSelectOptions,
        //                     max_values: 1,
        //                     min_values: 1
        //                 }
        //             ]
        //         }
        //     ]
        // })
        return
    } catch(e) {
        if (e instanceof ApiRequestError) {
            switch(e.getStatus()) {
                case 401: {
                    discordReplyToInteractionWithText(data.id, data.token, "Cannot authenticate with provided token, please verify if it is correct and have nessesarry permissions assigned")
                    throw new RegistrationFailedError("Invalid token")
                }
            }
            return
        }
        if (e instanceof DatabaseError) {
            throw new RegistrationFailedError("Database error")
        }
        if (e instanceof RegistrationFailedError) throw e
        console.log(e)
        throw new RegistrationFailedError("Unknown")
    }
}