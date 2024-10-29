import { WebhookEventMap } from "@octokit/webhooks-types"
import GithubEventType from "../../../../github/enum/github/event-type"

type WithAction = {
    action: string
}
type GithubWebhookEventPayloadMap = {
    [ET in GithubEventType]: ET extends keyof WebhookEventMap ? WebhookEventMap[ET] : WithAction
} & {
    [GithubEventType.PersonalAccessTokenRequest]: WithAction
    [GithubEventType.ProjectsV2]: WithAction
    [GithubEventType.ProjectsV2StatusUpdate]: WithAction
    [GithubEventType.RepositoryAdvisory]: WithAction
    [GithubEventType.RepositoryRuleset]: WithAction
    [GithubEventType.SecurityAndAnalysis]: WithAction
    [GithubEventType.SubIssues]: WithAction
}

export default GithubWebhookEventPayloadMap