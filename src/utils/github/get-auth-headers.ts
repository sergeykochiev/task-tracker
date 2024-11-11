import { GITHUB_HEADERS } from "../../const/github/api";

export default function githubGetAuthHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
        ...GITHUB_HEADERS
    }
}