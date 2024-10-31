import DiscordActions from "../../db/enum/discord-action"
import { DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from "../api/discord.api"

const DISCORD_ACTION_TO_URL_MAP: Record<DiscordActions, (channelId: string) => string> = {
    [DiscordActions.MessageCreate]: DISCORD_ENDPOINTS.MESSAGES,
}

export default DISCORD_ACTION_TO_URL_MAP