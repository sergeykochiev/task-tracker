import { GITHUB_HEADERS } from "../../../const/api/github.api";

export default function githubGetAuthHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
        ...GITHUB_HEADERS
    }
}