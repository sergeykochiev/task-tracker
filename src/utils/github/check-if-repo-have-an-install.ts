import { Endpoints } from "@octokit/types";
import { ErrorWrapperReturnType } from "../general/error-wrapper";
import githubGetRepositoryInstallation from "./api/get-repo-installation";
import githubWithJwtRenewal from "./api/with-jwt-renewal-wrapper";

//implement installation permissions validation
export default async function githubCheckIfRepoHaveAnInstall(owner: string, repo: string): Promise<{
    hasInstall: boolean,
    res: Endpoints["GET /repos/{owner}/{repo}/installation"]["response"]["data"]
}> {
    const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
    const data = await repoInstallRes.json()
    if(!repoInstallRes.ok || !data) return {
        hasInstall: false,
        res: data
    }
    return {
        hasInstall: true,
        res: data
    }
}