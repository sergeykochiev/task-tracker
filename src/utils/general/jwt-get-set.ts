import githubSignJwt from "../github/sign-jwt";

function jwtVault() {
    let jwt: string;

    function getJwt() {
        return jwt
    }

    function generateJwt() {
        jwt = githubSignJwt()
        return jwt
    }

    return [getJwt, generateJwt]
}

const [getCurrentGithubJwt, generateNewGithubJwt] = jwtVault()

export { getCurrentGithubJwt, generateNewGithubJwt }