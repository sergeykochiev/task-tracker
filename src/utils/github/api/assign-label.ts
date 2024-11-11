import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import GithubLabels from "../../../enum/github-labels";
import githubGetAuthHeaders from "../get-auth-headers";

export default async function githubAssignLabel(fullname: string, number: number, token: string, ...labels: GithubLabels[]) {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).ISSUES(number).LABELS.SELF, {
        headers: githubGetAuthHeaders(token),
        method: "PATCH",
        body: JSON.stringify({
            labels: labels
        })
    })
}