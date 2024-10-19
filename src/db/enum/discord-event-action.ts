import { GatewayDispatchEvents } from "discord-api-types/v10";

enum DiscordMacroAction {
    MessageCreate = GatewayDispatchEvents.MessageCreate,
    Notify = "NOTIFY",
    ReactToOriginalMessage = "REACT_TO_ORIGINAL_MESSAGE"
}

export default DiscordMacroAction