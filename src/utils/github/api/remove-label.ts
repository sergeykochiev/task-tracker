import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubGetAuthHeaders from "../get-auth-headers";

export default async function githubRemoveLabel(fullname: string, number: number, token: string, ...labels: string[]) {
    for(let i = 0; i < labels.length; i++) {
        const res = await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).ISSUES(number).LABELS.BY_NAME(labels[i]), {
            headers: githubGetAuthHeaders(token),
            method: "DELETE"
        })
    }
}