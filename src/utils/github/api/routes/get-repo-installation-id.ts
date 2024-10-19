import { GITHUB_ENDPOINTS } from "../../../../const/api/github.api";
import githubMakeRequest from "../github-request";

export default async function githubGetRepositoryInstallationId(owner: string, repo: string, token: string) {
    return await githubMakeRequest(GITHUB_ENDPOINTS.REPO(owner, repo).INSTALLATION, token)
}