import express from 'express';

export default function initGithubHookApi() {
    const app = express()
    const githubWebhookRouter = express.Router()
    githubWebhookRouter.post("/")
    app.use('/github', githubWebhookRouter)
    return app
}