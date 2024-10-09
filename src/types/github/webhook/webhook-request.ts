import { Request } from "express";
import GithubWebhookHeaders from "./webhook-headers";
import GithubWebhookEventPayloadMap from "./payload/payload-map";

type GithubWebhookRequestMap = {
    headers: GithubWebhookHeaders<"application/json">,
    body: GithubWebhookEventPayloadMap[keyof GithubWebhookEventPayloadMap]
}

type GithubWebhookRequest = Omit<Request, "headers" | "body"> & (GithubWebhookRequestMap)

export default GithubWebhookRequest

