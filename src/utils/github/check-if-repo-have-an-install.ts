import { Endpoints } from "@octokit/types";
import githubGetRepositoryInstallation from "./api/get-repo-installation";
import githubWithJwtRenewal from "./api/with-jwt-renewal-wrapper";

//implement installation permissions validation
export default async function githubCheckIfRepoHaveAnInstall(fullname: string): Promise<{
    hasInstall: boolean,
    installation: Endpoints["GET /repos/{owner}/{repo}/installation"]["response"]["data"]
}> {
    const repoInstallRes = await githubWithJwtRenewal(jwt => githubGetRepositoryInstallation(jwt, fullname))
    const data = await repoInstallRes.json()
    if(!repoInstallRes.ok || !data) return {
        hasInstall: false,
        installation: data
    }
    return {
        hasInstall: true,
        installation: data
    }
}