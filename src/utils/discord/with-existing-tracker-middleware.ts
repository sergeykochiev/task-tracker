import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import TrackerEntity from "../../db/entity/tracker.entity";
import { FindOptionsWhere } from "typeorm";

export default async function withExistingTracker<T extends APIApplicationCommandInteraction>(whereOptions: FindOptionsWhere<TrackerEntity>, callback: (tracker: TrackerEntity) => Promise<any>, error?: () => Promise<any>) {
    const tracker = await TrackerEntity.findOneBy(whereOptions)
    if(tracker) return await callback(tracker)
    if(error) await error()
}