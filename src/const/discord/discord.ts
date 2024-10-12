import DiscordConfig from "../../config/env/discord.config"

const DiscordConst = {
    URL: {
        API_ROOT: 'https://discord.com/api/v10/',
        ENDPOINTS: {
            COMMANDS: (appId: string | number) => `applications/${appId}/commands`,
            MESSAGES: (channelId: string | number) => `channels/${channelId}/messages`,
            FOLLOWUP_MESSAGE: (appId: string, interactionToken: string) => `/webhooks/${appId}/${interactionToken}`,
            GETAWAY: "gateway",
            INTERACTION_RESPONSE: (interactionId: string, interactionToken: string) => `/interactions/${interactionId}/${interactionToken}/callback`,
            CREATE_DM: "/users/@me/channels"
        }
    },
    AUTH_HEADERS: {
        Authorization: `Bot ${DiscordConfig.TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'TaskTrackerDiscordBot (https://github.com/sergeykochiev/task-tracker, 1.0.0)'
    }
} as const

export default DiscordConst