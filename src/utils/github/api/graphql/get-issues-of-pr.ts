import githubGraphQLRequest, { GITHUB_PULL_REQUEST_ISSUES_QUERY } from "./request";

export default async function githubGetIssuesOfPR(fullname: string, number: number, token: string) {
	const [owner, name] = fullname.split('/')
	const res = await githubGraphQLRequest(token, GITHUB_PULL_REQUEST_ISSUES_QUERY(name, owner, number, 3))
	return res.data.repository.pullRequest.closingIssuesReferences.nodes.map((issue: { number: number }) => issue.number)
}