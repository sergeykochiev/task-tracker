import { GITHUB_ENDPOINTS } from "../../../const/api/github.api";
import GithubApiAccessTokenResponseData from "../../../types/github/api/get-access-token-response-data";
import githubMakeRequest from "../github-request";

export default async function githubGetAccessToken(jwt: string, installId: string, repositoryIds?: string[]): Promise<GithubApiAccessTokenResponseData> {
    return await (await githubMakeRequest(GITHUB_ENDPOINTS.GET_ACCESS_TOKEN(installId), jwt, {
        method: "POST",
        body: repositoryIds && {
            repositoryIds: repositoryIds
        }
    })).json()
}