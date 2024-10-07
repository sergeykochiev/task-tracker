import { InteractionResponseType } from "discord-interactions"
import { Response } from "express"
import { InteractionType } from 'discord-api-types/v10';
import DiscordInteractionsRequest from "../types/discord/discord-interactions-request";

export default async function handleCommands(req: DiscordInteractionsRequest, res: Response): Promise<void> {
    const { type, data } = req.body
    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.ApplicationCommand) {
        if (!data) return
        const { name } = data
        if (name === 'register') {
            res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `register command`,
                },
            })
            return
        }
        console.error(`unknown command: ${name}`)
        res.status(400).json({ error: 'unknown command' })
        return
    }

    if (type === InteractionType.MessageComponent) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `hello world`,
            },
        })
    }

    console.error('unknown interaction type', type)
    res.status(400).json({ error: 'unknown interaction type' })
}