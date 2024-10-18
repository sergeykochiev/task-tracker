import { FindOptionsWhere } from "typeorm";
import TrackerEntity from "../../db/entity/tracker.entity";
import RegisterStatus from "../../db/enum/register-status";
import { makeDatabaseRequest } from "./repository-request";

export async function databaseBulkGetTrackersBy(where: FindOptionsWhere<TrackerEntity> | FindOptionsWhere<TrackerEntity>[]) {
    return await makeDatabaseRequest(TrackerEntity, "findBy", where)
}

export async function databaseGetTrackerById(id: TrackerEntity["discord_channel_id"]) {
    return await makeDatabaseRequest(TrackerEntity, "findOneBy", {
        discord_channel_id: id
    })
}

export async function databaseUpdateTracker(id: TrackerEntity["discord_channel_id"], updateTrackerDto: Partial<TrackerEntity>) {
    return await makeDatabaseRequest(TrackerEntity, "update", id, updateTrackerDto)
}

export async function databaseSaveTracker(saveTrackerDto: TrackerEntity) {
    return await makeDatabaseRequest(TrackerEntity, "save", saveTrackerDto)
}

export async function databaseUpdateTrackerStatus(id: string, newStatus: RegisterStatus) {
    return await makeDatabaseRequest(TrackerEntity, "update", id, {
        register_status: newStatus
    })
}

export async function databaseDeleteTracker(id: TrackerEntity["discord_channel_id"]) {
    return await makeDatabaseRequest(TrackerEntity, "delete", id)
}