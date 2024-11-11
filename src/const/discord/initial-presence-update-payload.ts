import { PresenceUpdateStatus, GatewayPresenceUpdateData } from "discord-api-types/v10";

const DISCORD_INITIAL_PRESENCE_UPDATE_PAYLOAD: GatewayPresenceUpdateData = {
    since: (new Date()).getTime(),
    activities: [],
    status: PresenceUpdateStatus.Online,
    afk: false
} as const

export default DISCORD_INITIAL_PRESENCE_UPDATE_PAYLOAD