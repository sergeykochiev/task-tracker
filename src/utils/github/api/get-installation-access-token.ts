import { Endpoints } from "@octokit/types";
import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubGetAuthHeaders from "../get-auth-headers";
import githubWithJwtRenewal from "./with-jwt-renewal-wrapper";

export default async function githubGetInstallationAccessToken(installId: number, repositoryIds?: string[]): Promise<Endpoints["POST /app/installations/{installation_id}/access_tokens"]["response"]["data"]["token"] | null> {
    const res = await githubWithJwtRenewal(async (jwt) => await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.GET_ACCESS_TOKEN(installId), {
        method: "POST",
        body: repositoryIds && JSON.stringify({
            repositoryIds: repositoryIds
        }),
        headers: githubGetAuthHeaders(jwt)
    }))
    if(res.ok) return null
    const json = await res.json()
    return json.token
}