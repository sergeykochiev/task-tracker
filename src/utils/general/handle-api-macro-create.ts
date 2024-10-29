import { Request, Response } from "express";
import macroParseAdditionalInfo from "./macro/parse-additional-info";
import MacroTarget from "../../db/enum/macro-target";
import macroCreateNew, { MacroPayload } from "./macro/create-new";
import { TargetBasedOn } from "../../db/entity/macro-action.entity";

type MacroRequestPayload<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>> = MacroPayload<Origin, Target> & Record<string, string>

export default async function handleApiMacroCreate<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>>(req: Request, res: Response) {
    const payload = req.body as MacroRequestPayload<Origin, Target>
    const { origin, event, target, action, ...additionalInfo } = payload
    const parsedInfo = macroParseAdditionalInfo(additionalInfo)
    console.dir(parsedInfo, {
        depth: Infinity
    })
    // const url = new URL(req.url)
    
    const createMacroRes = macroCreateNew(res.locals.channelId, {
        origin: origin, 
        target: target,
        event: event,
        action: action
    })
}