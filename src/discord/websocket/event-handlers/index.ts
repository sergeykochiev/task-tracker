import { GatewayDispatchEvents, GatewayDispatchPayload } from "discord-api-types/v10";
import discordHandleInteractionCreate from "./interaction";
import DiscordEvents from "../../../db/enum/discord-event";
import macroGetActionsByEvent from "../../../utils/general/macro/get-actions-by-event";
import MacroTarget from "../../../db/enum/macro-target";

export default async function discordHandleGatewayEvent(payload: GatewayDispatchPayload) {
    const event = payload.t
    switch(payload.t) {
        case GatewayDispatchEvents.InteractionCreate: discordHandleInteractionCreate(payload.d); break
    }
    if(!(Object).values<string>(DiscordEvents).includes(event)) return
    const eventActions = await macroGetActionsByEvent(MacroTarget.DISCORD, event as unknown as DiscordEvents)
    if(eventActions.err) return
    for(let a = 0; a < eventActions.data.length; a++) {
        const action = eventActions.data[a]
        
    }
}