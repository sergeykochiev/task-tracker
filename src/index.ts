import "reflect-metadata"
import discordInitWebsocket from "./utils/discord/init-websocket"
import expressInit from "./utils/general/express-init"

// TODO implement macro count limit for each channel
// TODO save jwts (probably not) and macrocreate uuid in redis
async function bootstrap() {
    await discordInitWebsocket()
    expressInit()
}

bootstrap()
