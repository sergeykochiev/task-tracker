import githubGenerateJwt from "../github/generate-jwt";

function jwtVault() {
    let jwt: string;

    function getJwt() {
        return jwt
    }

    function generateJwt() {
        jwt = githubGenerateJwt()
        return jwt
    }

    return [getJwt, generateJwt]
}

const [getCurrentGithubJwt, generateNewGithubJwt] = jwtVault()

export { getCurrentGithubJwt, generateNewGithubJwt }