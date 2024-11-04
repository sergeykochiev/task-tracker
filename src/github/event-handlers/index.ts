import { Request, Response } from "express";
import GithubEventType from "../../enum/github-event-type";
import GithubEvents from "../../enum/macro/github-event";
import MacroTarget from "../../enum/macro/macro-target";
import macroExecuteEventActions from "../../utils/general/macro/execute";
import githubValidateWebhookSignature from "../../utils/github/validate-webhook-call";
import githubHandleInstallationEvent from "./installation";
import GithubAppConfig from "../../envcfg/github.config";
import macroExecute from "../../utils/general/macro/execute";
import macroGetTargetTracker from "../../utils/general/macro/get-target-tracker-by-event";
import macroGetTargetTrackers from "../../utils/general/macro/get-target-tracker-by-event";
import { wrapErrorAsync } from "../../utils/general/error-wrapper";

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
    try {
        switch(eventType) {
            case GithubEventType.Installation: githubHandleInstallationEvent(data); break
        }
    } catch(e) {}
    if(data.hasOwnProperty("sender") && data.sender.id === GithubAppConfig.USER_ID) {
        return
    }
    if(!(Object).values<string>(GithubEvents).includes(event)) return
    if(!data.repository || !data.installation) return
    const targetMacros = await wrapErrorAsync(() => macroGetTargetTrackers(MacroTarget.GITHUB, event as unknown as GithubEvents, {
        // @ts-ignore
        github_repository: {
            owner: data.repository.owner.login,
            name: data.repository.name
        }
    }))
    if(targetMacros.err !== null || !targetMacros.data.length) return
    await macroExecute(targetMacros.data, data, data.installation.id)
}