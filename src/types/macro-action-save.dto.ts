import { BaseEntity, DeepPartial } from "typeorm";
import MacroActionEntity from "../db/entity/macro-action.entity";
import MacroEventEntity from "../db/entity/macro-event.entity";
import MacroEntity from "../db/entity/macro.entity";

interface MacroSaveDto extends Omit<MacroEntity, keyof BaseEntity | "event" | "trackers" | "action" | "id" | "parseAdditionalInfo"> {
    event: DeepPartial<MacroEventEntity>
    action: DeepPartial<MacroActionEntity>
}

export default MacroSaveDto