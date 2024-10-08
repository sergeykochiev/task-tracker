import { GatewayIntentBits, GatewayOpcodes } from "discord-api-types/v10"
import DiscordConfig from "../../config/env/discord.config"
import os from "node:os"
import DiscordConst from "./discord"

const DEFAULT_IDENTIFY_PAYLOAD = {
    op: GatewayOpcodes.Identify,
    d: {
        token: DiscordConfig.DISCORD_TOKEN,
        properties: {
            os: os.platform(),
            browser: DiscordConst.AUTH_HEADERS["User-Agent"],
            device: DiscordConst.AUTH_HEADERS["User-Agent"]
        },
        intents: GatewayIntentBits.GuildMessages + GatewayIntentBits.DirectMessages + GatewayIntentBits.MessageContent
    }
} as const

export default DEFAULT_IDENTIFY_PAYLOAD