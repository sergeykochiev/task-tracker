import express from 'express';
import AppConfig from '../../envcfg/app.config';
import githubHandleWebhookEvent from '../../github/event-handlers';
import discordHandleWebhookEvent from '../../discord/event-handlers';

export default function expressInit() {
    const app = express()

    app.post('/github', express.json(), githubHandleWebhookEvent)
    app.post('/discord', express.json(), discordHandleWebhookEvent)

    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('API listening on port', PORT)
    })

    return app
}