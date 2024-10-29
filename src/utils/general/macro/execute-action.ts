import MacroActionEntity, { TargetBasedOn } from "../../../db/entity/macro-action.entity";
import TrackerEntity from "../../../db/entity/tracker.entity";
import DiscordActions from "../../../db/enum/discord-action";
import GithubActions from "../../../db/enum/github-action";
import MacroTarget from "../../../db/enum/macro-target";

async function executeDiscordMacroAction(tracker: TrackerEntity, action: DiscordActions, additionalInfo?: string) {

}

async function executeGithubMacroAction(action: GithubActions, additionalInfo?: string) {

}

export default async function macroExecuteAction<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>>(action: MacroActionEntity<Origin, Target>) {
    switch(action.target) {
        case MacroTarget.DISCORD: executeDiscordMacroAction(action.event.tracker, action.action as DiscordActions, action.additional_info); break
        case MacroTarget.GITHUB: executeGithubMacroAction(action.action as GithubActions, action.additional_info)
    }
}