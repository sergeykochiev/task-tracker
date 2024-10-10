import { Response } from "express";
import GithubWebhookRequest from "../../types/github/webhook/webhook-request";
import handleGithubWebhookEvent from "./handle-webhook-event";
import GithubWebhookEventHandlerArgs from "../../types/utils/handle-github-webhook-event-args";
import validateWebhookSignature from "./validate-webhook-call";

export default async function handleGithubWebhookCall(req: GithubWebhookRequest, res: Response) {
    const signature = req.headers["X-Hub-Signature-256"].split("=")[1]
    const valid = await validateWebhookSignature(req.body, signature)
    if (!valid) res.status(401).send("Unauthorized")
    handleGithubWebhookEvent({
        eventType: req.headers["X-GitHub-Event"],
        data: JSON.parse(req.body)
    } as GithubWebhookEventHandlerArgs)
    return
}