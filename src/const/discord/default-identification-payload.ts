import { GatewayIdentify, GatewayIntentBits, GatewayOpcodes } from "discord-api-types/v10"
import DiscordConfig from "../../config/env/discord.config"
import os from "node:os"
import DiscordConst from "./discord"
import INITIAL_PRESENCE_UPDATE_PAYLOAD from "./initial-presence-update-payload"

const DISCORD_DEFAULT_IDENTIFY_PAYLOAD: GatewayIdentify = {
    op: GatewayOpcodes.Identify,
    d: {
        token: DiscordConfig.TOKEN,
        properties: {
            os: os.platform(),
            browser: DiscordConst.AUTH_HEADERS["User-Agent"],
            device: DiscordConst.AUTH_HEADERS["User-Agent"]
        },
        presence: INITIAL_PRESENCE_UPDATE_PAYLOAD,
        intents: GatewayIntentBits.GuildMessages + GatewayIntentBits.DirectMessages
    }
} as const

export default DISCORD_DEFAULT_IDENTIFY_PAYLOAD