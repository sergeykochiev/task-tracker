import { Label } from "@octokit/webhooks-types";
import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import GithubLabels from "../../../enum/github-labels";
import githubGetAuthHeaders from "../get-auth-headers";

export default async function githubOverwriteLabel(fullname: string, number: number, token: string, labels: GithubLabels[] | Label[]) {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).ISSUE(number).LABEL, {
        headers: githubGetAuthHeaders(token),
        method: "POST",
        body: JSON.stringify({
            labels: labels
        })
    })
}