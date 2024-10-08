import "dotenv/config"

const { ACCESS_TOKEN } = process.env

if (!ACCESS_TOKEN) {
    throw new Error("Not enough env data: github")
}

const GithubConfig = {
    ACCESS_TOKEN: ACCESS_TOKEN,
} as const

export default GithubConfig