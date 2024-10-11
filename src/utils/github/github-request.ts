import GithubConst from "../../const/github/github";
import ApiRequestError from "../../error/app/request.error";

async function githubMakeRequest(endpoint: string, options: Record<string, any>, token?: string): Promise<Response> {
    const url = GithubConst.URL.API_ROOT + endpoint
    if (options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: token ? GithubConst.AUTH_HEADERS(token) : undefined,
        ...options
    })
    if (!res.ok) {
        throw new ApiRequestError(res.status, res.statusText, await res.json())
    }
    return res;
}

export default githubMakeRequest