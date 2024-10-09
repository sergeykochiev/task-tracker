import { IncomingHttpHeaders } from "http"
import GithubEventType from "../../../enum/github/event-type"

interface GithubWebhookHeaders<ContentType extends "application/json" | "x-www-form-urlencoded", EventType extends GithubEventType = GithubEventType> extends IncomingHttpHeaders {
    "X-GitHub-Delivery": string
    "X-Hub-Signature": string
    "X-Hub-Signature-256": string
    "User-Agent": string
    "Content-Type": ContentType
    "Content-Length": `${number}`
    "X-GitHub-Event": EventType
    "X-GitHub-Hook-ID": `${number}`
    "X-GitHub-Hook-Installation-Target-ID": `${number}`
    "X-GitHub-Hook-Installation-Target-Type": "repository" | string
}

export default GithubWebhookHeaders