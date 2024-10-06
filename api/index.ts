import 'dotenv/config';
import express, { Request, Response } from 'express';
import {
    InteractionType,
    InteractionResponseType,
    verifyKeyMiddleware,
} from 'discord-interactions';
import envconfig from '../src/config/env/discord.config.js';
import sampleResponse from '../src/utils/sample-response.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(envconfig.PUBLIC_KEY), async (req: Request, res: Response) => {
    // Interaction type and data
    const { type, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        res.send({ type: InteractionResponseType.PONG });
        return
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        // "test" command
        if (name === 'test') {
            // Send a message into the channel where command was triggered from
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // Fetches a random emoji to send from a helper function
                    content: `hello world`,
                },
            });
            return
        }

        console.error(`unknown command: ${name}`);
        res.status(400).json({ error: 'unknown command' });
        return
    }

    console.error('unknown interaction type', type);
    res.status(400).json({ error: 'unknown interaction type' });
    return
});

app.get('/dupa', (req, res) => {
    res.status(200).send(sampleResponse())
})

app.get("", (req, res) => {
    res.status(200).send("hello world")
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

module.exports = app
