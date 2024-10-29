import MacroActionEntity from "../../../db/entity/macro-action.entity";
import DiscordEvents from "../../../db/enum/discord-event";
import GithubEvents from "../../../db/enum/github-event";
import MacroTarget from "../../../db/enum/macro-target";
import { makeDatabaseRequest } from "../../db/repository-request";

export default async function macroGetActionsByEvent<O extends MacroTarget>(origin: O, event: O extends MacroTarget.DISCORD ? DiscordEvents : O extends MacroTarget.GITHUB ? GithubEvents : string) {
    return await makeDatabaseRequest(MacroActionEntity, "findBy", {
        event: {
            origin: origin,
            event: event
        }
    })
}