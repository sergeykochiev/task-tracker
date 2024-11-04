import TypedResponse from "../../../types/typed-response"
import { generateNewGithubJwt, getCurrentGithubJwt } from "../../general/jwt-get-set"

export default async function githubWithJwtRenewal<R extends any>(callback: (jwt: string) => Promise<TypedResponse<R>>): Promise<TypedResponse<R>> {
    const res = await callback(getCurrentGithubJwt())
    if(res.ok) return res
    return await callback(generateNewGithubJwt())
}