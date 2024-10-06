import 'dotenv/config';
import express, { Request, Response } from 'express';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware,
} from 'discord-interactions';
import envconfig from '../src/config/env/discord.config.js';
import handleInteractions from '../src/handlers/interactions.handler.js';

const app = express()
const PORT = process.env.PORT || 3000

app.post('/interactions', verifyKeyMiddleware(envconfig.PUBLIC_KEY), handleInteractions)

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})

module.exports = app
