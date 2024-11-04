import { Request, Response } from "express";
import macroParseAdditionalInfo from "./macro/parse-additional-info";
import macroCreateNew, { MacroPayload } from "./macro/create-new-for-tracker";
import { TargetBasedOn } from "../../db/entity/macro-action.entity";
import { deleteMacroRequest } from "./validate-macro-request";
import discordSendMessageToChannel from "../discord/api/messages/send-message";
import MacroTarget from "../../enum/macro/macro-target";
import { wrapErrorAsync } from "./error-wrapper";
import MatchType from "../../types/match";

type MacroRequestPayload = MacroPayload & Record<string, string>

function isEmpty(obj: Record<any, any>) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false
    }
    return true
}

export default async function handleApiMacroCreate(req: Request, res: Response) {
    const payload = req.body as MacroRequestPayload
    const { origin, event, target, action, matchType, ...additionalInfo } = payload
    deleteMacroRequest(req.params.uuid)
    const channelId = res.locals.channelId
    if(!channelId) return
    const parsedInfo = macroParseAdditionalInfo(additionalInfo)
    parsedInfo.additionalInfo.matchType = matchType as MatchType
    const createMacroRes = await wrapErrorAsync(() => macroCreateNew(channelId, {
        origin: origin, 
        target: target,
        event: event,
        action: action
    }, isEmpty(additionalInfo) ? undefined : JSON.stringify(parsedInfo.additionalInfo), parsedInfo.shouldBeFetched)) 
    if(createMacroRes.err !== null) {
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