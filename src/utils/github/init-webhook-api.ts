import express from 'express';
import handleGithubHookCall from './handle-webhook-call';
import GithubWebhookRequest from '../../types/github/webhook/webhook-request';

export default function githubInitWebhookApi() {
    const app = express()
    const githubWebhookRouter = express.Router()
    githubWebhookRouter.post("", (req, res) => handleGithubHookCall(req as GithubWebhookRequest, res))
    app.use('/github', githubWebhookRouter)
    return app
}