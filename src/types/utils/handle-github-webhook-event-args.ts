import GithubEventType from "../../enum/github/event-type"
import GithubWebhookEventPayloadMap from "../github/webhook/payload/payload-map"

type GithubWebhookEventHandlerArgsMap = {
    [ET in GithubEventType]: {
        eventType: ET,
        data: GithubWebhookEventPayloadMap[ET]
    }   
}

type GithubWebhookEventHandlerArgs = GithubWebhookEventHandlerArgsMap[keyof GithubWebhookEventHandlerArgsMap]

export default GithubWebhookEventHandlerArgs