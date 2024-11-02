import "reflect-metadata"
import discordInitWebsocket from "./utils/discord/init-websocket"
import expressInit from "./utils/general/express-init"
import macroCreateDefault from "./utils/general/macro/create-default"

// TODO import/export macro settings in json
async function bootstrap() {
    await discordInitWebsocket()
    expressInit()
    await macroCreateDefault()
}

bootstrap()
