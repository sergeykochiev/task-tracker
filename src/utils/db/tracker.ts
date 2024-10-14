import { UpdateResult } from "typeorm";
import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";
import RegisterStatus from "../../db/enum/register-status";
import RepositoryEntity from "../../db/entity/repository.entity";

type UpdateTrackerCredentialsDto = Partial<TrackerEntity>

export async function dbBulkGetTrackersByRegistrarId(registrarId: TrackerEntity["registrar_id"]): Promise<TrackerEntity | null> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findOneBy({
            registrar_id: registrarId
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbBulkGetTrackersByRepositoryOwnerAndName(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]): Promise<TrackerEntity[]> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findBy({
            github_repository: {
                owner: owner,
                name: name
            }
        })
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

export async function dbUpdateTrackerStatusById(discordChannelId: string, newStatus: RegisterStatus): Promise<UpdateResult> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.update(discordChannelId, {
            register_status: newStatus
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}