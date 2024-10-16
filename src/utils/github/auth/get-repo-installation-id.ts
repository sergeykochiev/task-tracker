import { GITHUB_ENDPOINTS } from "../../../const/api/github.api";
import githubMakeRequest from "../api/github-request";

export default async function githubGetRepositoryInstallationId(owner: string, repo: string) {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.GET_INSTALL_ID_BY_REPO(owner, repo))).json()
}