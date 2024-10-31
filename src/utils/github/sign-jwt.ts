import * as jwt from 'jsonwebtoken';
import GithubAppConfig from '../../config/env/github.config';
import fs from "node:fs"
import os from "os"

const drift = 60

export default function githubSignJwt() {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 600
    const alg = "RS256"
    const payload = {
        iat: iat + drift,
        exp: exp,
        iss: GithubAppConfig.ID,
    }
    return jwt.sign(payload, fs.readFileSync("key.pem"), { algorithm: alg })
}