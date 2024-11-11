import * as jwt from 'jsonwebtoken';
import fs from "node:fs"
import GithubAppConfig from '../../envcfg/github.config';
import GithubConfig from '../../envcfg/github.config';

const drift = 60

export default function githubSignJwt() {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 600
    const alg = "RS256"
    const payload = {
        iat: iat + drift,
        exp: exp,
        iss: GithubAppConfig.APP.ID,
    }
    return jwt.sign(payload, GithubConfig.APP.PRIVATE_KEY, { algorithm: alg })
}