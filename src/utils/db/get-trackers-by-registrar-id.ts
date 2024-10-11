import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";

export default async function dbGetTrackerByRegistrarId(registrarId: string): Promise<TrackerEntity | null> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findOne({
            where: {
                registrar_id: registrarId
            }
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}