import DiscordActions from "../../enum/macro/discord-action"
import { DISCORD_ENDPOINTS } from "./api"

const DISCORD_ACTION_TO_URL_MAP: Record<DiscordActions, {
    url: (channelId: string) => string,
    method: string
}> = {
    [DiscordActions.MessageCreate]: {
        url: DISCORD_ENDPOINTS.MESSAGES,
        method: "POST",
    }
}

export default DISCORD_ACTION_TO_URL_MAP