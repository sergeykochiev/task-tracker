import GithubEventType from "../../../../enum/github/event-type";
import GithubIssueCommentsWebhookEventPayload from "./event/issue-comment.event";
import GithubIssuesWebhookEventPayload from "./event/issues.event";
import GithubLabelWebhookEventPayload from "./event/label.event";
import GithubMilestoneWebhookEventPayload from "./event/milestone.event";
import GithubPingWebhookEventPayload from "./event/ping.event";
import GithubPullRequestReviewCommentWebhookEventPayload from "./event/pull-request-review-comment.event";
import GithubPullRequestReviewThreadWebhookEventPayload from "./event/pull-request-review-thread.event";
import GithubPullRequestReviewWebhookEventPayload from "./event/pull-request-review.event";
import GithubPullRequestWebhookEventPayload from "./event/pull-request.event";

interface GithubWebhookEventPayloadMap extends Record<GithubEventType, any> {
    [GithubEventType.BranchProtectionConfiguration]: {}
    [GithubEventType.BranchProtectionRule]: {}
    [GithubEventType.CheckRun]: {}
    [GithubEventType.CheckSuite]: {}
    [GithubEventType.CodeScanningAlert]: {}
    [GithubEventType.CommitComment]: {}
    [GithubEventType.Create]: {}
    [GithubEventType.CustomProperty]: {}
    [GithubEventType.CustomPropertyValues]: {}
    [GithubEventType.Delete]: {}
    [GithubEventType.DependabotAlert]: {}
    [GithubEventType.DeployKey]: {}
    [GithubEventType.Deployment]: {}
    [GithubEventType.DeploymentProtectionRule]: {}
    [GithubEventType.DeploymentReview]: {}
    [GithubEventType.DeploymentStatus]: {}
    [GithubEventType.Discussion]: {}
    [GithubEventType.DiscussionComment]: {}
    [GithubEventType.Fork]: {}
    [GithubEventType.GithubAppAuthorization]: {}
    [GithubEventType.Gollum]: {}
    [GithubEventType.Installation]: {}
    [GithubEventType.InstallationRepositories]: {}
    [GithubEventType.InstallationTarget]: {}
    [GithubEventType.IssueComment]: GithubIssueCommentsWebhookEventPayload
    [GithubEventType.Issues]: GithubIssuesWebhookEventPayload
    [GithubEventType.Label]: GithubLabelWebhookEventPayload
    [GithubEventType.MarketplacePurchase]: {}
    [GithubEventType.Member]: {}
    [GithubEventType.Membership]: {}
    [GithubEventType.MergeGroup]: {}
    [GithubEventType.Meta]: {}
    [GithubEventType.Milestone]: GithubMilestoneWebhookEventPayload
    [GithubEventType.OrgBlock]: {}
    [GithubEventType.Organization]: {}
    [GithubEventType.Package]: {}
    [GithubEventType.PageBuild]: {}
    [GithubEventType.PersonalAccessTokenRequest]: {}
    [GithubEventType.Ping]: GithubPingWebhookEventPayload
    [GithubEventType.ProjectCard]: {}
    [GithubEventType.Project]: {}
    [GithubEventType.ProjectColumn]: {}
    [GithubEventType.ProjectsV2]: {}
    [GithubEventType.ProjectsV2Item]: {}
    [GithubEventType.ProjectsV2StatusUpdate]: {}
    [GithubEventType.Public]: {}
    [GithubEventType.PullRequest]: GithubPullRequestWebhookEventPayload
    [GithubEventType.PullRequestReviewComment]: GithubPullRequestReviewCommentWebhookEventPayload
    [GithubEventType.PullRequestReview]: GithubPullRequestReviewWebhookEventPayload
    [GithubEventType.PullRequestReviewThread]: GithubPullRequestReviewThreadWebhookEventPayload
    [GithubEventType.Push]: {}
    [GithubEventType.RegistryPackage]: {}
    [GithubEventType.Release]: {}
    [GithubEventType.RepositoryAdvisory]: {}
    [GithubEventType.Repository]: {}
    [GithubEventType.RepositoryDispatch]: {}
    [GithubEventType.RepositoryImport]: {}
    [GithubEventType.RepositoryRuleset]: {}
    [GithubEventType.RepositoryVulnerabilityAlert]: {}
    [GithubEventType.SecretScanningAlert]: {}
    [GithubEventType.SecretScanningAlertLocation]: {}
    [GithubEventType.SecurityAdvisory]: {}
    [GithubEventType.SecurityAndAnalysis]: {}
    [GithubEventType.Sponsorship]: {}
    [GithubEventType.Star]: {}
    [GithubEventType.Status]: {}
    [GithubEventType.SubIssues]: {}
    [GithubEventType.TeamAdd]: {}
    [GithubEventType.Team]: {}
    [GithubEventType.Watch]: {}
    [GithubEventType.WorkflowDispatch]: {}
    [GithubEventType.WorkflowJob]: {}
    [GithubEventType.WorkflowRun]: {}
}

export default GithubWebhookEventPayloadMap