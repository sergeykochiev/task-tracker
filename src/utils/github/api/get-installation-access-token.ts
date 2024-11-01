import { Endpoints } from "@octokit/types";
import { GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubMakeRequest from "../github-request";

export default async function githubGetInstallationAccessToken(jwt: string, installId: string, repositoryIds?: string[]) {
    return await githubMakeRequest<Endpoints["POST /app/installations/{installation_id}/access_tokens"]["response"]>(GITHUB_ENDPOINTS.GET_ACCESS_TOKEN(installId), jwt, {
        method: "POST",
        body: repositoryIds && JSON.stringify({
            repositoryIds: repositoryIds
        })
    })
}