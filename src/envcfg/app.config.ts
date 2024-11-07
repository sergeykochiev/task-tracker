const { APP_PORT } = process.env

const AppConfig = {
    PORT: APP_PORT || 3000,
} as const

export default AppConfig