import GithubLabel from "./label"
import GithubMilestone from "./milestone"
import GithubPullRequest from "./pull-request"
import GithubReactions from "./reactions"
import GithubUser from "./user"

interface GithubIssue {
    active_lock_reason: "resolved" | "off-topic" | "too heated" | "spam" | null
    assignee?: GithubUser | null,
    assignees: GithubUser[],
    author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER"
    body: string | null
    closed_at: string | null
    comments: number
    comments_url: string
    created_at: string
    draft?: boolean
    events_url: string
    html_url: string
    id: number
    labels?: GithubLabel[]
    labels_url: string
    locked?: boolean
    milestone: GithubMilestone | null
    node_id: string
    number: number
    performed_via_github_app: object | null
    pull_request?: GithubPullRequest
    reactions: GithubReactions
    repository_url: string
    state: "open" | "closed"
    state_reason?: string | null
    timeline_url?: string
    title: string
    updated_at: string
    url: string
    user: GithubUser | null
}

export default GithubIssue