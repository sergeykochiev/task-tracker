import { Request } from "express";
import GithubWebhookHeaders from "./webhook-headers";
import GithubEventType from "../../../enum/github/event-type";
import GithubWebhookEventPayloadMap from "./payload/payload-map";

type GithubWebhookEventPartialRequest<EventType extends GithubEventType> = {
    headers: GithubWebhookHeaders<"application/json", EventType>,
    body: GithubWebhookEventPayloadMap[EventType]
}
type EventPayloadHelperMap = {
    [EventType in GithubEventType]: GithubWebhookEventPartialRequest<EventType>
}

type GithubWebhookRequest = Omit<Request, "headers" | "body"> & (EventPayloadHelperMap[keyof EventPayloadHelperMap])

export default GithubWebhookRequest

