import "reflect-metadata"
import discordInitWebsocket from "./utils/discord/init-websocket"
import expressInit from "./utils/general/express-init"

// TODO save jwts (probably not) and macrocreate uuid in redis
// TODO implement macro list command and deleting macros
async function bootstrap() {
    await discordInitWebsocket()
    expressInit()
}

bootstrap()
