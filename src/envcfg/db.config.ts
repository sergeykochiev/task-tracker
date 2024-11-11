import "dotenv/config"

const { POSTGRES_DB, POSTGRES_PORT, POSTGRES_USER, DB_HOST, POSTGRES_PASSWORD } = process.env

if (!POSTGRES_DB || !POSTGRES_PORT || !POSTGRES_USER || !POSTGRES_PASSWORD) {
    throw new Error("Not enough env data: db")
}

const DatabaseConfig = {
    NAME: POSTGRES_DB,
    HOST: DB_HOST || "localhost",
    PORT: +POSTGRES_PORT,
    USERNAME: POSTGRES_USER,
    PASSWORD: POSTGRES_PASSWORD
} as const

export default DatabaseConfig