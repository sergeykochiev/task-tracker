import GithubEventType from "../../enum/github/event-type"
import { WebhookEventMap } from "@octokit/webhooks-types"

type GithubWebhookEventHandlerArgsMap = {
    [ET in GithubEventType]: {
        eventType: ET,
        data: ET extends keyof WebhookEventMap ? WebhookEventMap[ET] : object
    }
}

type GithubWebhookEventHandlerArgs = GithubWebhookEventHandlerArgsMap[keyof GithubWebhookEventHandlerArgsMap]

export default GithubWebhookEventHandlerArgs