import { GITHUB_ENDPOINTS } from "../../../const/github/api";
import githubMakeRequest from "../github-request"
import { Endpoints } from "@octokit/types";

export default async function githubGetRepositoryInstallation(jwt: string, owner: string, repo: string) {
    return await githubMakeRequest<Endpoints["GET /repos/{owner}/{repo}/installation"]["response"]["data"]>(GITHUB_ENDPOINTS.REPO(owner, repo).INSTALLATION, jwt)
}