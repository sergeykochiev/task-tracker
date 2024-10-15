import { FindOptionsWhere, UpdateResult } from "typeorm";
import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";
import RegisterStatus from "../../db/enum/register-status";

type UpdateTrackerCredentialsDto = Partial<TrackerEntity>

export async function dbBulkGetTrackersBy(where: FindOptionsWhere<TrackerEntity> | FindOptionsWhere<TrackerEntity>[]): Promise<TrackerEntity[]> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findBy(where)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export default async function dbGetTrackerById(discordChannelid: TrackerEntity["discord_channel_id"]): Promise<TrackerEntity | null> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findOneBy({
            discord_channel_id: discordChannelid
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbUpdateTracker(id: TrackerEntity["discord_channel_id"], updateTrackerCredentialsDto: UpdateTrackerCredentialsDto): Promise<UpdateResult> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.update(id, updateTrackerCredentialsDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbSaveTracker(saveTrackerEntityDto: TrackerEntity): Promise<TrackerEntity> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.save(saveTrackerEntityDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbUpdateTrackerStatus(discordChannelId: string, newStatus: RegisterStatus): Promise<UpdateResult> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.update(discordChannelId, {
            register_status: newStatus
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}