import { GatewayDispatchEvents, GatewayDispatchPayload } from "discord-api-types/v10";
import discordHandleInteractionCreate from "./interaction";
import MacroTarget from "../../enum/macro/macro-target";
import macroExecuteEventActions from "../../utils/general/macro/execute-actions";
import macroGetActionsByEvent from "../../utils/general/macro/get-actions-by-event";
import DiscordEvents from "../../enum/macro/discord-event";
import DiscordConfig from "../../envcfg/discord.config";

export default async function discordHandleGatewayEvent(payload: GatewayDispatchPayload) {
    const event = payload.t
    switch(payload.t) {
        case GatewayDispatchEvents.InteractionCreate: discordHandleInteractionCreate(payload.d); break
    }
    // @ts-ignore
    if(payload.d.hasOwnProperty("author") && payload.d.author.id === DiscordConfig.APP_ID) {
        return
    }
    if(!(Object).values<string>(DiscordEvents).includes(event)) return
    const eventActions = await macroGetActionsByEvent(MacroTarget.DISCORD, event as unknown as DiscordEvents)
    if(eventActions.err !== null) return
    await macroExecuteEventActions(eventActions.data, payload.d)
}