import { GITHUB_API_ROOT } from "../../../../const/github/api"
import githubGetAuthHeaders from "../../get-auth-headers"

export const GITHUB_PULL_REQUEST_ISSUES_QUERY = (name: string, owner: string, number: number, first: number) => `query { repository(followRenames: true, name: ${name}, owner: ${owner}) { pullRequest(number: ${number}) { closingIssuesReferences(first: ${first}) { nodes { number } } } } }`

export default async function githubGraphQLRequest(token: string, query?: string) {
	const res = await fetch(GITHUB_API_ROOT + "/graphql", {
		method: query !== undefined ? "POST" : "GET",
		headers: githubGetAuthHeaders(token),
		body: query !== undefined ? JSON.stringify({ query }) : undefined
	})
	if(!res.ok) return null
    return await res.json()
}