import { Request, Response } from "express";
import GithubEventType from "../../enum/github-event-type";
import githubValidateWebhookSignature from "../../utils/github/validate-webhook-call";
import githubHandleInstallationEvent from "./installation";
import githubHandlePushEvent from "./push";
import githubHandleIssueCommentEvent from "./issuecomment";
import githubHandleIssuesEvent from "./issues";
import githubHandlePullRequestEvent from "./pullrequest";
import githubHandlePullRequestReviewCommentEvent from "./pullrequestreviewcomment";
import withExistingTracker from "../../utils/discord/with-existing-tracker-middleware";

export default async function githubHandleWebhookEvent(req: Request, res: Response) {
    console.log("API GITHUB received github webhook call")
    const signature = (req.headers["x-hub-signature-256"] as string).split("=")[1]
    const valid = await githubValidateWebhookSignature(JSON.stringify(req.body), signature)
    if (!valid) {
        res.status(401).send("Unauthorized")
        console.log("API github webhook call unauthorized, returning")
        return
    }
    console.log("API GITHUB github webhook call authorized, proceeding")
    res.status(202).send("Accepted")
    const eventType = req.headers["x-github-event"]
    const data = req.body
    console.log("API GITHUB handling github webhook event", eventType?.toString().toUpperCase())
    try {
        switch(eventType) {
            case GithubEventType.Installation: await githubHandleInstallationEvent(data); break
            case GithubEventType.PullRequest: await withExistingTracker({ repository_fullname: data.repository.full_name }, (t) => githubHandlePullRequestEvent(data, t)); break
            case GithubEventType.Issues: await withExistingTracker({ repository_fullname: data.repository.full_name }, (t) => githubHandleIssuesEvent(data, t)); break
            case GithubEventType.IssueComment: await withExistingTracker({ repository_fullname: data.repository.full_name }, (t) => githubHandleIssueCommentEvent(data, t)); break
            case GithubEventType.PullRequestReviewComment: await withExistingTracker({ repository_fullname: data.repository.full_name }, (t) => githubHandlePullRequestReviewCommentEvent(data, t)); break
            case GithubEventType.Push: await withExistingTracker({ repository_fullname: data.repository.full_name }, (t) => githubHandlePushEvent(data, t)); break
        }
    } catch(e) {
        console.error("ERROR - API GITHUB failed to handle event", eventType?.toString().toUpperCase(), "error", e)
    }
}