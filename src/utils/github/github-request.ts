import GithubAppConfig from "../../config/env/github.config";
import { GITHUB_API_ROOT, GITHUB_HEADERS } from "../../const/api/github.api";
import ApiRequestError from "../../error/app/request.error";
import githubGetAuthHeaders from "./auth/get-auth-headers";

async function githubMakeRequest(endpoint: string, token: string = GithubAppConfig.CLIENT_SECRET, options?: Record<string, any>): Promise<Response> {
    const url = GITHUB_API_ROOT + endpoint
    if (options && options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: token ? githubGetAuthHeaders(token) : GITHUB_HEADERS,
        ...options
    })
    if (!res.ok) {
        throw new ApiRequestError(res.status, res.statusText, await res.json())
    }
    return res;
}

export default githubMakeRequest