import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubGetAuthHeaders from "../get-auth-headers";

export default async function githubOverwriteLabel(fullname: string, number: number, token: string, labels: string[]) {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).ISSUES(number).LABELS.SELF, {
        headers: githubGetAuthHeaders(token),
        method: "PUT",
        body: JSON.stringify({
            labels: labels
        })
    })
}