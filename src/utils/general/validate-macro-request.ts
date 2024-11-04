import { NextFunction, Request, Response } from "express"

function macroRequestsClosure(): [(uuid: string) => string, (uuid: string) => string, (uuid: string) => void] {
    const macroRequests: Record<string, string> = {}

    function a(channelId: string) {
        const uuid = crypto.randomUUID()
        macroRequests[uuid] = channelId
        return uuid
    }

    function g(uuid: string) {
        const channelId = macroRequests[uuid]
        return channelId
    }

    function d(uuid: string) {
        delete macroRequests[uuid]
        return
    }

    return [a, g, d]
}

const [addMacroRequest, getMacroRequestChannelId, deleteMacroRequest] = macroRequestsClosure()

export { addMacroRequest, deleteMacroRequest }

export default function validateMacroRequestMiddleware(req: Request, res: Response, next: NextFunction) {
    const channelId = getMacroRequestChannelId(req.params.uuid)
    if(channelId === undefined) {
        console.log("not valid")
        res.status(404).send()
        return
    }
    console.log("valid")
    res.locals.channelId = channelId
    next()
}