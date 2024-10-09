import { IncomingHttpHeaders } from "http"
import GithubEventType from "../../../enum/github/event-type"
import ContentType from "../../utils/content-type"

interface GithubWebhookHeaders<CT extends ContentType = ContentType, ET extends GithubEventType = GithubEventType> extends IncomingHttpHeaders {
    "X-GitHub-Delivery": string
    "X-Hub-Signature": string
    "X-Hub-Signature-256": string
    "User-Agent": string
    "Content-Type": CT
    "Content-Length": `${number}`
    "X-GitHub-Event": ET
    "X-GitHub-Hook-ID": `${number}`
    "X-GitHub-Hook-Installation-Target-ID": `${number}`
    "X-GitHub-Hook-Installation-Target-Type": "repository" | string
}

export default GithubWebhookHeaders