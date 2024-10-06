const { APP_ID, DISCORD_TOKEN, PUBLIC_KEY } = process.env

if (!APP_ID || !DISCORD_TOKEN || !PUBLIC_KEY) {
    throw new Error("Not enough env data")
}

const discordConfig = {
    APP_ID: APP_ID,
    DISCORD_TOKEN: DISCORD_TOKEN,
    PUBLIC_KEY: PUBLIC_KEY
} as const

export default discordConfig