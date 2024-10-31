import { Endpoints } from "@octokit/types";
import { ErrorWrapperReturnType } from "../general/error-wrapper";
import githubGetRepositoryInstallation from "./api/get-repo-installation";
import githubWithJwtRenewal from "./api/with-jwt-renewal-wrapper";

//implement installation permissions validation
export default async function githubCheckIfRepoHaveAnInstall(owner: string, repo: string): Promise<ErrorWrapperReturnType<{
    hasInstall: boolean,
    res: Endpoints["GET /repos/{owner}/{repo}/installation"]["response"]["data"]
}>> {
    const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, owner, repo))
    if(repoInstallRes.err !== null) return repoInstallRes
    if(repoInstallRes.data.data == null || !repoInstallRes.data.ok || !repoInstallRes.data.data) return {
        err: null,
        data: {
            hasInstall: false,
            res: repoInstallRes.data.data
        }
    }
    return {
        err: null,
        data: {
            hasInstall: true,
            res: repoInstallRes.data.data
        }
    }
}