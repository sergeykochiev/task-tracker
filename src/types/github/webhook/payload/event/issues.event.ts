import GithubIssue from "../../../entity/issue";
import GithubIssueAction from "../../../../../enum/github/issue-action";

interface GithubIssuesWebhookEventPayload {
    action: GithubIssueAction
    enterprise: object,
    installation: object,
    issue: GithubIssue,
    organization: object,
    repository: object,
    sender: object
}

export default GithubIssuesWebhookEventPayload