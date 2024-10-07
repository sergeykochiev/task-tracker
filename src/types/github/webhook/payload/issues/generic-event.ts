import GithubIssue from "../../../entity/issue";
import GithubIssueAction from "./action";

interface GenericGithubIssueEventPayload<Action extends GithubIssueAction = GithubIssueAction> {
    action: Action
    enterprise: object,
    installation: object,
    issue: GithubIssue,
    organization: object,
    repository: object,
    sender: object
}

export default GenericGithubIssueEventPayload