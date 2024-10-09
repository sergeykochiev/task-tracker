import express from 'express';
import handleGithubHookCall from './handle-hook-call';
import GithubWebhookRequest from '../../types/github/webhook/request';

export default function initGithubHookApi() {
    const app = express()
    const githubWebhookRouter = express.Router()
    githubWebhookRouter.post("", express.json(), (req, res) => handleGithubHookCall(req as GithubWebhookRequest, res))
    app.use('/github', githubWebhookRouter)
    return app
}