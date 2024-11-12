import githubSignJwt from "../github/sign-jwt";

function jwt() {
    let jwt: string;

    function get() { return jwt }

    function gen() {
        jwt = githubSignJwt()
        return jwt
    }

    return [get, gen]
}

const [getCurrentGithubJwt, generateNewGithubJwt] = jwt()

export { getCurrentGithubJwt, generateNewGithubJwt }