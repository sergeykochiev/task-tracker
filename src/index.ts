import "reflect-metadata"
import expressInit from "./utils/general/express-init"
import AppDataSource from "./db/data-source"

// TODO save jwts (probably not) and macrocreate uuid in redis
async function bootstrap() {
    AppDataSource.initialize()
    expressInit()
}

bootstrap()
