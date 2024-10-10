import { IncomingHttpHeaders } from "http"
import GithubEventType from "../../../enum/github/event-type"
import ContentType from "../../utils/content-type"

interface GithubWebhookHeaders<CT extends ContentType = ContentType, ET extends GithubEventType = GithubEventType> extends IncomingHttpHeaders {
    "x-github-delivery": string
    "x-hub-signature": string
    "x-hub-signature-256": string
    "user-agent": string
    "content-type": CT
    "content-length": `${number}`
    "x-github-event": ET
    "x-github-hook-id": `${number}`
    "x-github-hook-installation-target-id": `${number}`
    "x-github-hook-installation-target-type": "repository" | string
}

export default GithubWebhookHeaders