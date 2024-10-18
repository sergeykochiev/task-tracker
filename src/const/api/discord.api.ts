import DiscordConfig from "../../config/env/discord.config"

export const DISCORD_ENDPOINTS = {
    COMMANDS: (appId: string | number) => `applications/${appId}/commands`,
    MESSAGES: (channelId: string | number) => `channels/${channelId}/messages`,
    FOLLOWUP_MESSAGE: (appId: string, interactionToken: string) => `/webhooks/${appId}/${interactionToken}`,
    GATEWAY: "gateway",
    INTERACTION_RESPONSE: (interactionId: string, interactionToken: string) => `/interactions/${interactionId}/${interactionToken}/callback`,
    CREATE_DM: "/users/@me/channels",
    EDIT_ORIGINAL_INTERACTION_RESPONSE: (appId: string, interactionToken: string) => `/webhooks/${appId}/${interactionToken}/messages/@original`,
    PIN_MESSAGE: (channelId: string, messageId: string) => `/channels/${channelId}/pins/${messageId}`,
    MESSAGE: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}`
} as const

const DISCORD_API_ROOT = 'https://discord.com/api/'

const DISCORD_API_VERSION = "v10"

export const DISCORD_V10_API_ROOT = DISCORD_API_ROOT + DISCORD_API_VERSION + "/"

export const DISCORD_AUTH_HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bot ${DiscordConfig.TOKEN}`,
    'User-Agent': 'TaskTrackerDiscordBot (https://github.com/sergeykochiev/task-tracker, 1.0.0)'
} as const