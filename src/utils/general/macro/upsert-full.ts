import MacroActionEntity from "../../../db/entity/macro-action.entity"
import MacroEventEntity from "../../../db/entity/macro-event.entity"
import MacroEntity from "../../../db/entity/macro.entity"
import MacroSaveDto from "../../../types/macro-action-save.dto"

export default async function macroUpsertFull(dto: MacroSaveDto): Promise<number> {
    const event = await MacroEventEntity.upsert({
        origin: dto.event.origin,
        event: dto.event.event
    }, {
        conflictPaths: [
            "origin",
            "event",
        ],
    })
    const action = await MacroActionEntity.upsert({
        action: dto.action.action,
        target: dto.action.target
    }, {
        conflictPaths: [
            "action",
            "target",
        ],
    })
    const macro = await MacroEntity.upsert({
        ...dto,
        event: {
            id: event.identifiers[0].id
        },
        action: {
            id: action.identifiers[0].id
        }
    }, {
        conflictPaths: [
            "action",
            "event",
            "additional_info"
        ],
    })
    return macro.identifiers[0].id
}