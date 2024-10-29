import { NextFunction, Request, Response } from "express"

function macroRequestsClosure() {
    const macroRequests: Record<string, string> = {}

    function a(channelId: string) {
        const uuid = crypto.randomUUID()
        macroRequests[uuid] = channelId
        return uuid
    }

    function g(uuid: string) {
        const channelId = macroRequests[uuid]
        delete macroRequests[uuid]
        return channelId
    }

    return [a, g]
}

const [addMacroRequest, getMacroRequestChannelId] = macroRequestsClosure()

export { addMacroRequest }

export default function validateMacroRequestMiddleware(req: Request, res: Response, next: NextFunction) {
    const channelId = getMacroRequestChannelId(req.params.uuid)
    if(channelId === undefined) {
        res.status(404)
        return
    }
    res.locals.channelId = channelId
    next()
}