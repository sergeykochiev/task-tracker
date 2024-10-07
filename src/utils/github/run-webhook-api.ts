import AppConfig from "../../config/env/app.config"
import initGithubHookApi from "./init-webhook-api"

export default function runGithubHookApi() {
    const app = initGithubHookApi()
    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('Listening on port', PORT)
    })
    return app
}