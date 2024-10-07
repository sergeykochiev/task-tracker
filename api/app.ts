import 'dotenv/config';
import express from 'express';
import {
    verifyKeyMiddleware,
} from 'discord-interactions';
import handleCommands from '../src/handlers/command.handler.js';
import discordConfig from '../src/config/env/discord.config.js';

const app = express()
const PORT = process.env.PORT || 3000

app.post('/discord/interactions', verifyKeyMiddleware(discordConfig.PUBLIC_KEY), handleCommands)
app.post('/github/webhooks', )

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})

module.exports = app
