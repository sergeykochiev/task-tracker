import discordConfig from "../config/env/discord.config"
import ConstObjectType from "../types/utils/const-object-type"

const DiscordConst = {
    URL: {
        API_ROOT: 'https://discord.com/api/v10/',
        ENDPOINTS: {
            COMMANDS: (appId: string | number) => `applications/${appId}/commands`
        }
    },
    AUTH_HEADERS: {
        Authorization: `Bot ${discordConfig.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'TaskTrackerDiscordBot (https://github.com/sergeykochiev/task-tracker, 1.0.0)'
    }
} as const

export default DiscordConst