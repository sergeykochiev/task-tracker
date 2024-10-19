import OriginalMessageEntity from "../../db/entity/original-message.entity";
import DiscordMacroAction from "../../db/enum/discord-event-action";

interface DiscordMacroActionInfoMap extends Record<DiscordMacroAction, string | null> {
    [DiscordMacroAction.MessageCreate]: null,
    [DiscordMacroAction.Notify]: OriginalMessageEntity["id"]
    [DiscordMacroAction.ReactToOriginalMessage]: OriginalMessageEntity["id"]
}

export default DiscordMacroActionInfoMap