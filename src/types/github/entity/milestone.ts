import GithubUser from "./user"

interface GithubMilestone {
    closed_at: string | null
    closed_issues: number
    created_at: string
    creator: GithubUser | null
    description: string | null
    due_on: string | null
    html_url: string
    id: number
    labels_url: string
    node_id: string
    number: number
    open_issues: number
    state: "open" | "closed"    
    title: string
    updated_at: string
    url: string
}

export default GithubMilestone