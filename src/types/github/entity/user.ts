interface GithubUser {
    avatar_url?: string
    deleted?: boolean
    email?: string | null
    events_url?: string
    followers_url?: string
    following_url?: string
    gists_url?: string
    gravatar_id?: string
    html_url?: string
    id: number
    login: string
    name?: string
    node_id?: string
    organizations_url?: string
    received_events_url?: string
    repos_url?: string
    site_admin?: boolean
    starred_url?: string
    subscriptions_url?: string
    type?: "Bot" | "User" | "Organization"
    url?: string
}

export default GithubUser