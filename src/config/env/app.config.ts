const { PORT } = process.env

const AppConfig = {
    PORT: PORT || 3000,
} as const

export default AppConfig