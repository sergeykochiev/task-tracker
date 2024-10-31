import { ErrorWrapperReturnType } from "../../general/error-wrapper"
import { generateNewGithubJwt, getCurrentGithubJwt } from "../../general/jwt-get-set"
import { RequestReturn } from "../../general/request"

export default async function githubWithJwtRenewal<R extends ErrorWrapperReturnType<RequestReturn>>(callback: (jwt: string) => Promise<R>): Promise<R> {
    const res = await callback(getCurrentGithubJwt())
    if(res.data && res.data.ok) return res
    return await callback(generateNewGithubJwt())
}