import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import GithubLabels from "../../../enum/github-labels";
import githubGetAuthHeaders from "../get-auth-headers";

export default async function githubRemoveLabel(fullname: string, number: number, token: string, ...labels: GithubLabels[]) {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).ISSUE(number).LABEL, {
        headers: githubGetAuthHeaders(token),
        method: "DELETE",
        body: JSON.stringify({
            labels: labels
        })
    })
}