import { Request, Response } from "express";
import macroParseAdditionalInfo from "./macro/parse-additional-info";
import macroCreateNew, { MacroPayload } from "./macro/create-new";
import { TargetBasedOn } from "../../db/entity/macro-action.entity";
import { deleteMacroRequest } from "./validate-macro-request";
import discordSendMessageToChannel from "../discord/api/messages/send-message";
import MacroTarget from "../../enum/macro/macro-target";

type MacroRequestPayload<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>> = MacroPayload<Origin, Target> & Record<string, string>

function isEmpty(obj: Record<any, any>) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false
    }
    return true
}

export default async function handleApiMacroCreate<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>>(req: Request, res: Response) {
    const payload = req.body as MacroRequestPayload<Origin, Target>
    const { origin, event, target, action, ...additionalInfo } = payload
    deleteMacroRequest(req.params.uuid)
    const channelId = res.locals.channelId
    if(!channelId) return
    const parsedInfo = macroParseAdditionalInfo(additionalInfo)
    const createMacroRes = await macroCreateNew(channelId, {
        origin: origin, 
        target: target,
        event: event,
        action: action
    }, isEmpty(additionalInfo) ? undefined : JSON.stringify(parsedInfo.additionalInfo), parsedInfo.shouldBeFetched)
    if(createMacroRes.err !== null) {
        console.log(createMacroRes)
        await discordSendMessageToChannel(channelId, {
            content: "Error while creating macro."
        })
        return
    }
    await discordSendMessageToChannel(channelId, {
        content: "Macro created."
    })
    return
}