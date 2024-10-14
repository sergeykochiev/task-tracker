import DiscordConfig from "../../config/env/discord.config"

const DiscordConst = {
    URL: {
        API_ROOT: 'https://discord.com/api/v10/',
        
    },
    AUTH_HEADERS: {
        Authorization: `Bot ${DiscordConfig.TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'TaskTrackerDiscordBot (https://github.com/sergeykochiev/task-tracker, 1.0.0)'
    }
} as const

export default DiscordConst