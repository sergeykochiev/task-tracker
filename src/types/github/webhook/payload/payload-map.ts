import { WebhookEventMap } from "@octokit/webhooks-types"
import GithubEventType from "../../../../enum/github/event-type"

type GithubWebhookEventPayloadMap = {
    [ET in GithubEventType]: ET extends keyof WebhookEventMap ? WebhookEventMap[ET] : object
} & {
    [GithubEventType.PersonalAccessTokenRequest]: {}
    [GithubEventType.ProjectsV2]: {}
    [GithubEventType.ProjectsV2StatusUpdate]: {}
    [GithubEventType.RepositoryAdvisory]: {}
    [GithubEventType.RepositoryRuleset]: {}
    [GithubEventType.SecurityAndAnalysis]: {}
    [GithubEventType.SubIssues]: {}
}

export default GithubWebhookEventPayloadMap