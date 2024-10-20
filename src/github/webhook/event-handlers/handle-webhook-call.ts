import { Request, Response } from "express";
import handleGithubWebhookEvent from ".";
import GithubWebhookEventHandlerArgs from "../../../types/utils/handle-github-webhook-event-args";
import validateWebhookSignature from "../../../utils/github/validate-webhook-call";

export default async function githubHandleWebhookCall(req: Request, res: Response) {
    console.log("Received github webhook call")
    const signature = (req.headers["x-hub-signature-256"] as string).split("=")[1]
    const valid = await validateWebhookSignature(JSON.stringify(req.body), signature)
    if (!valid) {
        res.status(401).send("Unauthorized")
        console.log("Github webhook call unauthorized, returning...")
        return
    }
    console.log("Github webhook call authorized, proceeding...")
    res.status(202).send("Accepted")
    handleGithubWebhookEvent({
        eventType: req.headers["x-github-event"],
        data: req.body,
    } as GithubWebhookEventHandlerArgs)
    return
}