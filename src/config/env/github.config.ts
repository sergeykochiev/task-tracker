import "dotenv/config"

const { GITHUB_ACCESS_TOKEN, GITHUB_WEBHOOK_KEY } = process.env

if (!GITHUB_ACCESS_TOKEN || !GITHUB_WEBHOOK_KEY) {
    throw new Error("Not enough env data: github")
}

const GithubConfig = {
    ACCESS_TOKEN: GITHUB_ACCESS_TOKEN,
    WEBHOOK_SECRET: GITHUB_WEBHOOK_KEY
} as const

export default GithubConfig