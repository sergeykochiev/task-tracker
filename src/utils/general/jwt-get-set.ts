import githubSignJwt from "../github/sign-jwt";

function jwt() {
    let jwt: string;

    function get() {
        return jwt
    }

    function gen() {
        try {
            jwt = githubSignJwt()
        }
        catch(e) {
            console.error(e)
        }
        return jwt
    }

    return [get, gen]
}

const [getCurrentGithubJwt, generateNewGithubJwt] = jwt()

export { getCurrentGithubJwt, generateNewGithubJwt }