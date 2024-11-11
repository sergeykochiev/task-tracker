import "dotenv/config"

const { GITHUB_WEBHOOK_KEY, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_ID } = process.env

if (!GITHUB_WEBHOOK_KEY || !GITHUB_APP_PRIVATE_KEY || !GITHUB_APP_ID) {
    throw new Error("Not enough env data: github")
}

const GithubConfig = {
    WEBHOOK_SECRET: GITHUB_WEBHOOK_KEY,
    APP: {
        PRIVATE_KEY: GITHUB_APP_PRIVATE_KEY,
        ID: GITHUB_APP_ID,
    }
} as const

export default GithubConfig