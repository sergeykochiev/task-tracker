import MacroActionEntity from "../../../db/entity/macro-action.entity";
import { makeDatabaseRequest } from "../../../db/repository-request";
import DiscordEvents from "../../../enum/macro/discord-event";
import GithubEvents from "../../../enum/macro/github-event";
import MacroTarget from "../../../enum/macro/macro-target";

export default async function macroGetActionsByEvent<O extends MacroTarget>(origin: O, event: O extends MacroTarget.DISCORD ? DiscordEvents : O extends MacroTarget.GITHUB ? GithubEvents : string) {
    return await makeDatabaseRequest(MacroActionEntity, "findBy", {
        event: {
            origin: origin,
            event: event
        }
    })
}