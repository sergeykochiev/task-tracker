import TrackerEntity from "../../../db/entity/tracker.entity";
import MacroTarget from "../../../enum/macro/macro-target";
import macroCascadeSave from "./upsert-full";
import DiscordMacroEvents from "../../../enum/macro/discord-event";
import GithubMacroEvents from "../../../enum/macro/github-event";
import DiscordMacroActions from "../../../enum/macro/discord-action";
import GithubMacroActions from "../../../enum/macro/github-action";
import macroSaveTrackerRelations from "./save-tracker-macros-relations";

export interface MacroPayload {
    origin: MacroTarget
    target: MacroTarget
    event: DiscordMacroEvents | GithubMacroEvents
    action: DiscordMacroActions | GithubMacroActions
}

export default async function macroCreateNewForTracker(channelId: string, payload: MacroPayload, info?: string, infoRequiresFetching?: boolean) {
    const tracker = await TrackerEntity.findOneBy({
        discord_channel_id: channelId
    })
    if(!tracker) throw new Error("No tracker found")
    const createRes = await macroCascadeSave({
        action: {
            action: payload.action,
            target: payload.target
        },
        event: {
            origin: payload.origin,
            event: payload.event
        },
        additional_info: info,
        is_default: false,
        info_requires_fetching: infoRequiresFetching,
    })
    const res = await macroSaveTrackerRelations({
        macroId: createRes,
        channelTrackerDiscordChannelId: channelId
    })
    return createRes
}