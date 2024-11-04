import { Endpoints } from "@octokit/types";
import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubGetAuthHeaders from "../get-auth-headers";
import TypedResponse from "../../../types/typed-response";

export default async function githubGetInstallationAccessToken(jwt: string, installId: string, repositoryIds?: string[]): Promise<TypedResponse<Endpoints["POST /app/installations/{installation_id}/access_tokens"]["response"]["data"]>> {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.GET_ACCESS_TOKEN(installId), {
        method: "POST",
        body: repositoryIds && JSON.stringify({
            repositoryIds: repositoryIds
        }),
        headers: githubGetAuthHeaders(jwt)
    })
}