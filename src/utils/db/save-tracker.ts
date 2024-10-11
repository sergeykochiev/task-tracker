import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";

export default async function dbSaveTracker(saveTrackerEntityDto: TrackerEntity): Promise<TrackerEntity> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.save(saveTrackerEntityDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}