import { UpdateResult } from "typeorm";
import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";
import GithubRepoEntity from "../../db/entity/repository.entity";

export default async function dbUpdateTrackerRepoById(id: number, newRepo: Partial<GithubRepoEntity>): Promise<UpdateResult> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.update(id, {
            github_repository: newRepo
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}