import express from 'express';
import handleGithubHookCall from './handle-webhook-call';

export default function githubInitWebhookApi() {
    const app = express()
    const githubWebhookRouter = express.Router()
    githubWebhookRouter.post("/", express.json(), handleGithubHookCall)
    app.use('/github', githubWebhookRouter)
    return app
}