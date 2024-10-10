import GithubConst from "../../const/github/github";

async function githubMakeRequest(endpoint: string, options: Record<string, any>): Promise<Response> {
    const url = GithubConst.URL.API_ROOT + endpoint
    if (options.body) options.body = JSON.stringify(options.body)
    const res = await fetch(url, {
        headers: GithubConst.AUTH_HEADERS,
        ...options
    })
    if (!res.ok) {
        const data = await res.json()
        console.log(res.status)
        throw new Error(JSON.stringify(data))
    }
    return res;
}

export default githubMakeRequest