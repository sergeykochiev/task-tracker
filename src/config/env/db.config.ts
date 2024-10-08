import "dotenv/config"

const { DB_NAME } = process.env

if (!DB_NAME) {
    throw new Error("Not enough env data: db")
}

const DatabaseConfig = {
    DB_NAME: DB_NAME,
} as const

export default DatabaseConfig