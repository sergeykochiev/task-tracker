import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import GithubLabels from "../../../enum/github-labels";
import githubGetAuthHeaders from "../get-auth-headers";
import githubGetInstallationAccessToken from "./get-installation-access-token";

export default async function githubCreateBaseLabels(fullname: string, installId: number) {
    const token = await githubGetInstallationAccessToken(installId)
    if(!token) throw "Couldn't retrieve Github token"
    for(const label in GithubLabels) {
        if(!label) continue
        // @ts-ignore
        try {
            await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(fullname).LABELS, {
                headers: githubGetAuthHeaders(token),
                method: "POST",
                body: JSON.stringify({
                    name: GithubLabels[label as keyof typeof GithubLabels],
                    color: "FAFAFA"
                })
            })
        } catch(e) {
            continue
        }
    }
}