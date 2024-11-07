import { generateNewGithubJwt, getCurrentGithubJwt } from "../../general/jwt-get-set"

export default async function githubWithJwtRenewal<R extends Response>(callback: (jwt: string) => Promise<R>): Promise<R> {
    const res = await callback(getCurrentGithubJwt())
    if(res.ok) return res
    return await callback(generateNewGithubJwt())
}