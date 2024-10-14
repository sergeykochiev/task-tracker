import * as jwt from 'jsonwebtoken';
import GithubConfig from '../../../config/env/github.config';

const drift = 60

export default function githubGenerateJwt() {
    const iat = Math.floor(Date.now() / 1000) + drift
    const exp = iat + 600
    const alg = "RS256"
    const payload = {
        iat: iat,
        exp: exp,
        iss: GithubConfig.APP.ID,
    }
    return jwt.sign(payload, GithubConfig.APP.PRIVATE_KEY, { algorithm: alg })
}