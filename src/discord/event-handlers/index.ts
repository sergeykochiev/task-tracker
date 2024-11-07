import { APIApplicationCommandInteraction, InteractionType } from "discord-api-types/v10";
import { Request, Response } from "express";
import discordValidateWebhookSignature from "../../utils/discord/validate-webhook-call";
import discordHandleApplicationCommandInteraction from "./commands";

export default async function discordHandleWebhookEvent(req: Request, res: Response) {
    const data = (req.body as APIApplicationCommandInteraction)
    const signature = req.get("X-Signature-Ed25519")!
    const timestamp = req.get("X-Signature-Timestamp")!
    const body = JSON.stringify(data)

    if (!discordValidateWebhookSignature(timestamp + body, signature)) {
        res.status(401).end("invalid request signature")
        return
    }
    res.status(202).send()
    switch(req.body.type) {
        case InteractionType.Ping: res.json({
            type: InteractionType.Ping,
        }).send(); break
    }
    switch(data.type) {
        case InteractionType.ApplicationCommand: discordHandleApplicationCommandInteraction(data); break
    }
}