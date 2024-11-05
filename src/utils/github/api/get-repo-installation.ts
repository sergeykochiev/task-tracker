import { GITHUB_API_ROOT, GITHUB_ENDPOINTS } from "../../../const/github/api";
import { Endpoints } from "@octokit/types";
import githubGetAuthHeaders from "../get-auth-headers";
import TypedResponse from "../../../types/typed-response";

export default async function githubGetRepositoryInstallation(jwt: string, owner: string, repo: string): Promise<TypedResponse<Endpoints["GET /repos/{owner}/{repo}/installation"]["response"]["data"]>> {
    return await fetch(GITHUB_API_ROOT + GITHUB_ENDPOINTS.REPO(owner, repo).INSTALLATION, {
        headers: githubGetAuthHeaders(jwt)
    })
}