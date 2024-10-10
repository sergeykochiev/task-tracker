import "dotenv/config"

const { DISCORD_APP_ID, DISCORD_TOKEN, DISCORD_PUBLIC_KEY } = process.env

if (!DISCORD_APP_ID || !DISCORD_TOKEN || !DISCORD_PUBLIC_KEY) {
    throw new Error("Not enough env data: discord")
}

const DiscordConfig = {
    APP_ID: DISCORD_APP_ID,
    TOKEN: DISCORD_TOKEN,
    PUBLIC_KEY: DISCORD_PUBLIC_KEY
} as const

export default DiscordConfig