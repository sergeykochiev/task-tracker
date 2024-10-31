import "reflect-metadata"
import discordInitWebsocket from "./utils/discord/init-websocket"
import expressInit from "./utils/general/express-init"

discordInitWebsocket()
expressInit()