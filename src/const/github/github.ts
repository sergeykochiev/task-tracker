import GithubConfig from "../../config/env/github.config"

const GithubConst = {
    URL: {
        API_ROOT: "",
        ENDPOINTS: {
            HOOKS: (owner: string, repo: string) => `/repos/${owner}/${repo}/hooks`
        }
    },
    AUTH_HEADERS: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GithubConfig.ACCESS_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28"
    }
}

export default GithubConst