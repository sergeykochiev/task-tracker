import express from 'express';
import handleGithubHookCall from '../../github/webhook/handle-webhook-call';
import AppConfig from '../../config/env/app.config';
import handleApiMacroCreate from './handle-api-macro-create';
import cors from "cors"
import validateMacroRequestMiddleware from './validate-macro-request';

export default function expressInit() {
    const app = express()
    app.use(cors())

    const macroRouter = express.Router()
    macroRouter.use("/", express.static("static/macro"))
    macroRouter.post("/", express.json(), handleApiMacroCreate)

    app.use("/macro/:uuid", validateMacroRequestMiddleware, macroRouter)
    app.post('/github', express.json(), handleGithubHookCall)
    // app.post('/macro-create', express.json(), handleApiMacroCreate)

    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('Listening on port', PORT)
    })

    return app
}