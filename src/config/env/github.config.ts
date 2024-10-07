const { ACCESS_TOKEN } = process.env

if (!ACCESS_TOKEN) {
    throw new Error("Not enough env data")
}

const GithubConfig = {
    ACCESS_TOKEN: ACCESS_TOKEN,
} as const

export default GithubConfig