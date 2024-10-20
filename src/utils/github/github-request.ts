import GithubAppConfig from "../../config/env/github.config";
import { GITHUB_API_ROOT, GITHUB_HEADERS } from "../../const/api/github.api";
import makeRequest, { ParsedBody, UnparsedBodyRequestInit } from "../general/request";
import githubGetAuthHeaders from "./get-auth-headers";

type GithubRequestErrorBody = any

async function githubMakeRequest<T extends ParsedBody = never>(endpoint: string, token?: string, options?: Omit<UnparsedBodyRequestInit, "headers">) {
    return await makeRequest<T, GithubRequestErrorBody>(GITHUB_API_ROOT + endpoint, {
        headers: token ? githubGetAuthHeaders(token) : GITHUB_HEADERS,
        ...options
    })
}

export default githubMakeRequest