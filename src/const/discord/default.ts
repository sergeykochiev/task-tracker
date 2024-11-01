import { GatewayIdentify, GatewayIntentBits, GatewayOpcodes } from "discord-api-types/v10"
import os from "node:os"
import INITIAL_PRESENCE_UPDATE_PAYLOAD from "./initial-presence-update-payload"
import DiscordConfig from "../../envcfg/discord.config"
import { DISCORD_AUTH_HEADERS } from "./api"

export const DISCORD_DEFAULT_IDENTIFY_PAYLOAD: GatewayIdentify = {
    op: GatewayOpcodes.Identify,
    d: {
        token: DiscordConfig.TOKEN,
        properties: {
            os: os.platform(),
            browser: DISCORD_AUTH_HEADERS["User-Agent"],
            device: DISCORD_AUTH_HEADERS["User-Agent"]
        },
        presence: INITIAL_PRESENCE_UPDATE_PAYLOAD,
        intents: GatewayIntentBits.GuildMessages + GatewayIntentBits.DirectMessages + GatewayIntentBits.MessageContent
    }
} as const