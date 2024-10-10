import GithubEventType from "../../enum/github/event-type"
import { WebhookEventMap } from "@octokit/webhooks-types"

type GithubWebhookEventHandlerArgsMap = {
    [ET in GithubEventType]: ET extends keyof WebhookEventMap ? {
        eventType: ET,
        data: WebhookEventMap[ET]
    } : object
}

type GithubWebhookEventHandlerArgs = GithubWebhookEventHandlerArgsMap[keyof GithubWebhookEventHandlerArgsMap]

export default GithubWebhookEventHandlerArgs