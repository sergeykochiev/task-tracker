import MacroActionEntity from "../../../db/entity/macro-action.entity";
import MacroEventEntity from "../../../db/entity/macro-event.entity";
import DiscordMacroActions from "../../../enum/macro/discord-action";
import GithubMacroEvents from "../../../enum/macro/github-event";
import MacroTarget from "../../../enum/macro/macro-target";
import fs from "node:fs"
import DEFAULT_ACTIONS from "./default-actions";
import { wrapErrorAsync } from "../error-wrapper";

async function createDefaultMacro(githubEvent: GithubMacroEvents, info: string) {
    const event = await wrapErrorAsync(() => MacroEventEntity.save({
        origin: MacroTarget.GITHUB,
        event: githubEvent
    }))
    if(event.err !== null) return
    const action = await wrapErrorAsync(() => MacroActionEntity.save({
        action: DiscordMacroActions.MessageCreate,
        target: MacroTarget.DISCORD,
        event: event.data,
        is_default: true,
        additional_info: info
    }))
}

export default async function macroCreateDefault() {
    DEFAULT_ACTIONS.map(async data => await createDefaultMacro(data.event, fs.readFileSync(`resources/${data.name}.json`).toString()))
}