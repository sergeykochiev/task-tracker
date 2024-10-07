import GithubEventTypes from "../../../enum/github/event-type"

interface GithubWebhookHeaders {
    "X-GitHub-Delivery": string
    "X-Hub-Signature": string
    "X-Hub-Signature-256": string
    "User-Agent": string
    "Content-Type": "application/json" | "x-www-form-urlencoded"
    "Content-Length": number
    "X-GitHub-Event": GithubEventTypes
    "X-GitHub-Hook-ID": 292430182
    "X-GitHub-Hook-Installation-Target-ID": 79929171
    "X-GitHub-Hook-Installation-Target-Type": "repository" | string
}

export default GithubWebhookHeaders