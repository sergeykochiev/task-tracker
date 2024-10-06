import { InteractionResponseType, InteractionType } from "discord-interactions"
import { Request, Response } from "express"

export default async function handleInteractions(req: Request, res: Response)  {
    const { type, data } = req.body

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        res.send({ type: InteractionResponseType.PONG })
        return
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data

        // "test" command
        if (name === 'register') {
            // Send a message into the channel where command was triggered from
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // Fetches a random emoji to send from a helper function
                    content: `hello world`,
                },
            })
            return
        }

        console.error(`unknown command: ${name}`)
        res.status(400).json({ error: 'unknown command' })
        return
    }

    console.error('unknown interaction type', type)
    res.status(400).json({ error: 'unknown interaction type' })
    return
}