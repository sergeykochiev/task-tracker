const { ACCESS_TOKEN } = process.env

if (!ACCESS_TOKEN) {
    throw new Error("Not enough env data")
}

const GithubConfig = {
    APP_ID: ACCESS_TOKEN,
} as const

export default GithubConfig