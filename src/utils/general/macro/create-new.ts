import TrackerEntity from "../../../db/entity/tracker.entity";
import MacroTarget from "../../../db/enum/macro-target";
import MacroEventEntity from "../../../db/entity/macro-event.entity";
import MacroActionEntity, { TargetBasedOn } from "../../../db/entity/macro-action.entity";
import GithubEvents from "../../../db/enum/github-event";
import DiscordEvents from "../../../db/enum/discord-event";
import DiscordActions from "../../../db/enum/discord-action";
import GithubActions from "../../../db/enum/github-action";
import { makeDatabaseRequest } from "../../db/repository-request";
import { ErrorWrapperReturnType } from "../error-wrapper";

export interface MacroPayload<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>> {
    origin: Origin
    target: Target
    event: Origin extends MacroTarget.DISCORD ? DiscordEvents : Origin extends MacroTarget.GITHUB ? GithubEvents : never
    action: Target extends MacroTarget.DISCORD ? DiscordActions : Target extends MacroTarget.GITHUB ? GithubActions : never
}

export default async function macroCreateNew<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>>(channelId: string, payload: MacroPayload<Origin, Target>, info?: string, infoRequiresFetching?: boolean): Promise<ErrorWrapperReturnType<{
    event: MacroEventEntity<Origin>,
    action: MacroActionEntity<Origin, Target>
}>> {
    const getTrackerRes = await makeDatabaseRequest(TrackerEntity, "findOneById", channelId)
    if(getTrackerRes.err !== null) return getTrackerRes
    if(!getTrackerRes.data) {
        return {
            err: "No tracker registered on this channel",
            data: null
        }
    }
    const newMacroEvent: Omit<MacroEventEntity<Origin>, "id"> = {
        event: payload.event,
        tracker: getTrackerRes.data,
        origin: payload.origin
    }
    const createEventRes = await makeDatabaseRequest(MacroEventEntity, "save", newMacroEvent)
    if(createEventRes.err) return createEventRes
    const newMacroAction = {
        action: payload.action,
        event: createEventRes.data as MacroEventEntity<Origin>,
        target: payload.target,
        additional_info: info,
        info_requires_fetching: infoRequiresFetching
    }
    const createActionRes = await makeDatabaseRequest(MacroActionEntity, "save", newMacroAction)
    if(createActionRes.err !== null) return createActionRes
    return {
        err: null, 
        data: {
            event: createEventRes.data as MacroEventEntity<Origin>,
            action: createActionRes.data as MacroActionEntity<Origin, Target>
        }
    }
}