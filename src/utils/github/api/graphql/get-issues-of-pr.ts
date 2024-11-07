import githubGraphQLRequest, { GITHUB_PULL_REQUEST_ISSUES_QUERY } from "./request";

export default async function githubGetIssuesOfPR(owner: string, name: string, number: number, token: string) {
	const res = await githubGraphQLRequest(token, GITHUB_PULL_REQUEST_ISSUES_QUERY(name, owner, number, 3))
	return res.repository.pullRequest.closingIssuesReferences.nodes.map((issue: { number: number }) => issue.number)
}