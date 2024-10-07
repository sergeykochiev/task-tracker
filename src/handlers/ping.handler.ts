import { InteractionResponseType, InteractionType } from "discord-interactions"
import { Request, Response } from "express"

export default async function pongIfPing(req: Request, res: Response, next?: () => void) {
    const { type } = req.body
    if (type === InteractionType.PING) {
        res.send({ type: InteractionResponseType.PONG })
        return
    }
    next && next()
}