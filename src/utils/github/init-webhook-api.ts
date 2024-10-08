import express from 'express';
import handleGithubHookCall from '../../handlers/github/webhook/handle-hook-call';

export default function initGithubHookApi() {
    const app = express()
    const githubWebhookRouter = express.Router()
    githubWebhookRouter.post("/:repoSlug", handleGithubHookCall)
    app.use('/github', githubWebhookRouter)
    return app
}