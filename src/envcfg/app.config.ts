const { APP_PORT, APP_HOST } = process.env

if (!APP_HOST) {
    throw new Error("Not enough env data: db")
}

const AppConfig = {
    PORT: APP_PORT || 3000,
    HOST: APP_HOST
} as const

export default AppConfig