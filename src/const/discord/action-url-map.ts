import DiscordActions from "../../enum/macro/discord-action"
import { DISCORD_ENDPOINTS } from "./api"

const DISCORD_ACTION_TO_URL_MAP: Record<DiscordActions, (channelId: string) => string> = {
    [DiscordActions.MessageCreate]: DISCORD_ENDPOINTS.MESSAGES,
}

export default DISCORD_ACTION_TO_URL_MAP