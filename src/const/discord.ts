import discordConfig from "../config/env/discord.config"

const DiscordConst = {
    URL: {
        API_ROOT: 'https://discord.com/api/v10/',
        ENDPOINTS: {
            COMMANDS: (appId: string | number) => `applications/${appId}/commands`,
            MESSAGES: (channelId: string | number) => `channels/${channelId}/messages`,
            FOLLOWUP_MESSAGE: (appId: string | number, interactionToken: string) => `/webhooks/${appId}/${interactionToken}`,
            GETAWAY: "gateway"
        }
    },
    AUTH_HEADERS: {
        Authorization: `Bot ${discordConfig.DISCORD_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'TaskTrackerDiscordBot (https://github.com/sergeykochiev/task-tracker, 1.0.0)'
    }
} as const

export default DiscordConst