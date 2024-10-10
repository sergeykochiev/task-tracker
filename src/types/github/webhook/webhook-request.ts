import { Request } from "express";
import GithubWebhookHeaders from "./webhook-headers";

interface GithubWebhookRequest extends Request {
    headers: GithubWebhookHeaders<"application/json">,
}

export default GithubWebhookRequest

