import { UpdateResult } from "typeorm";
import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import RegisterStatus from "../../db/enum/register-status";
import DatabaseError from "../../error/db/database.error";

export default async function dbUpdateTrackerStatusById(discordChannelId: string, newStatus: RegisterStatus): Promise<UpdateResult> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.update(discordChannelId, {
            register_status: newStatus
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}