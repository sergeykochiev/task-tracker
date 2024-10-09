import { Response } from "express";
import GithubWebhookRequest from "../../types/github/webhook/webhook-request";
import handleGithubWebhookEvent from "./handle-webhook-event";
import GithubWebhookEventHandlerArgs from "../../types/utils/handle-github-webhook-event-args";

export default async function handleGithubWebhookCall(req: GithubWebhookRequest, res: Response) {
    handleGithubWebhookEvent({
        eventType: req.headers["X-GitHub-Event"],
        data: req.body 
    } as GithubWebhookEventHandlerArgs)
    return
}