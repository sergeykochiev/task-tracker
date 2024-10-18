import express from 'express';
import handleGithubHookCall from './handle-webhook-call';
import AppConfig from '../../config/env/app.config';

export default function githubInitWebhookApi() {
    const app = express()
    app.post('/github', express.json(), handleGithubHookCall)
    const PORT = AppConfig.PORT
    app.listen(PORT, () => {
        console.log('Listening on port', PORT)
    })
    return app
}