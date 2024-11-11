import "dotenv/config"

const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env

if (!DB_NAME || !DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD) {
    throw new Error("Not enough env data: db")
}

const DatabaseConfig = {
    NAME: DB_NAME,
    HOST: DB_HOST,
    PORT: +DB_PORT,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD
} as const

export default DatabaseConfig