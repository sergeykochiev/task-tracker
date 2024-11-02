import express from 'express';
import handleApiMacroCreate from './handle-api-macro-create';
import cors from "cors"
import validateMacroRequestMiddleware from './validate-macro-request';
import AppConfig from '../../envcfg/app.config';
import githubHandleWebhookEvent from '../../github/event-handlers';

export default function expressInit() {
    const app = express()
    app.use(cors())

    const macroRouter = express.Router()
    macroRouter.use("/", express.static("static/macro"))
    macroRouter.post("/", express.json(), handleApiMacroCreate)

    app.use(
        "/macro/:uuid",
        validateMacroRequestMiddleware,
        macroRouter
    )
    app.post('/github', express.json(), githubHandleWebhookEvent)
    app.post('/macro-create', express.json(), handleApiMacroCreate)

    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('Listening on port', PORT)
    })

    return app
}