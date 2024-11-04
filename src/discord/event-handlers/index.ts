import { GatewayDispatchEvents, GatewayDispatchPayload } from "discord-api-types/v10";
import discordHandleInteractionCreate from "./interaction";
import MacroTarget from "../../enum/macro/macro-target";
import DiscordEvents from "../../enum/macro/discord-event";
import DiscordConfig from "../../envcfg/discord.config";
import { wrapErrorAsync } from "../../utils/general/error-wrapper";
import macroExecute from "../../utils/general/macro/execute";
import macroGetTargetTracker from "../../utils/general/macro/get-target-tracker-by-event";

export default async function discordHandleGatewayEvent(payload: GatewayDispatchPayload) {
    const event = payload.t
    switch(payload.t) {
        case GatewayDispatchEvents.InteractionCreate: discordHandleInteractionCreate(payload.d); break
    }
    // @ts-ignore
    if(payload.d.hasOwnProperty("author") && payload.d.author.id === DiscordConfig.APP_ID || !payload.d.hasOwnProperty("channel_id")) {
        return
    }
    if(!(Object).values<string>(DiscordEvents).includes(event)) return
    const targetMacros = await wrapErrorAsync(() => macroGetTargetTracker(MacroTarget.DISCORD, event as unknown as DiscordEvents, {
        // @ts-ignore
        discord_channel_id: payload.d.channel_id
    }))
    if(targetMacros.err !== null || !targetMacros.data.length) return
    await macroExecute(targetMacros.data, payload.d)
}