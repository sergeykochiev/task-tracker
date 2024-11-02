import { Request, Response } from "express";
import GithubEventType from "../../enum/github-event-type";
import GithubEvents from "../../enum/macro/github-event";
import MacroTarget from "../../enum/macro/macro-target";
import macroExecuteEventActions from "../../utils/general/macro/execute-actions";
import macroGetActionsByEvent from "../../utils/general/macro/get-actions-by-event";
import githubValidateWebhookSignature from "../../utils/github/validate-webhook-call";
import githubHandleInstallationEvent from "./installation";
import githubHandlePingEvent from "./ping";
import GithubAppConfig from "../../envcfg/github.config";

export default async function githubHandleWebhookEvent(req: Request, res: Response) {
    console.log("Received github webhook call")
    const signature = (req.headers["x-hub-signature-256"] as string).split("=")[1]
    const valid = await githubValidateWebhookSignature(JSON.stringify(req.body), signature)
    if (!valid) {
        res.status(401).send("Unauthorized")
        console.log("Github webhook call unauthorized, returning...")
        return
    }
    console.log("Github webhook call authorized, proceeding...")
    res.status(202).send("Accepted")
    const eventType = req.headers["x-github-event"]
    const data = req.body
    console.log("Received github webhook event:", eventType)
    const event = `${eventType}${data.hasOwnProperty("action") ? `/${data.action}` : ""}`
    switch(eventType) {
        case GithubEventType.Installation: githubHandleInstallationEvent(data); break
        case GithubEventType.Ping: githubHandlePingEvent(data); break
    }
    if(data.hasOwnProperty("sender") && data.sender.id === GithubAppConfig.USER_ID) {
        return
    }
    if(!(Object).values<string>(GithubEvents).includes(event)) return
    const eventActions = await macroGetActionsByEvent(MacroTarget.GITHUB, event as unknown as GithubEvents)
    console.log(MacroTarget.GITHUB, event)
    if(eventActions.err !== null) return
    console.dir(eventActions, {
        depth: Infinity
    })
    await macroExecuteEventActions(eventActions.data, data, data.installation.id)
    return
}