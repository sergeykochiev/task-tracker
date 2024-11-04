import MacroEntity from "../../../db/entity/macro.entity"
import macroSaveTrackerRelations from "./save-tracker-macros-relations"

export default async function macroAssignDefaults(channelId: string) {
    const defaultMacros = await MacroEntity.findBy({
        is_default: true
    })
    return await macroSaveTrackerRelations(defaultMacros.map(macro => {
        return {
            macroId: macro.id,
            channelTrackerDiscordChannelId: channelId
        }
    }))
}