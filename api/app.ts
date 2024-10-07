import 'dotenv/config';
import express from 'express';
import {
    verifyKeyMiddleware,
} from 'discord-interactions';
import handleCommands from '../src/handlers/command.handler.js';
import discordConfig from '../src/config/env/discord.config.js';
import AppConfig from '../src/config/env/app.config.js';

const app = express()
const PORT = AppConfig.PORT

const githubWebhookRouter = express.Router()
githubWebhookRouter.post("test")
githubWebhookRouter.post("ping")
githubWebhookRouter.post("deliveries")

const discordRouter = express.Router()
githubWebhookRouter.post("interactions", verifyKeyMiddleware(discordConfig.PUBLIC_KEY), handleCommands)

app.use('/discord', discordRouter)
app.use('/github', githubWebhookRouter)

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})

module.exports = app
