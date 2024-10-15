import { FindOptionsWhere, Repository, UpdateResult } from "typeorm"
import AppDataSource from "../../db/data-source"
import RepositoryEntity from "../../db/entity/repository.entity"
import DatabaseError from "../../error/db/database.error"

export async function dbSaveRepository(repository: Omit<RepositoryEntity, "id">): Promise<RepositoryEntity> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.save(repository)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbBulkGetRepositoriesBy(where: FindOptionsWhere<RepositoryEntity>): Promise<RepositoryEntity[]> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.findBy(where)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbGetRepositoryByOwnerAndName(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]) {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.findOneBy({
            owner: owner,
            name: name
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbUpdateRepository(id: RepositoryEntity["id"], updateRepositoryDto: Partial<Omit<RepositoryEntity, "id">>): Promise<UpdateResult> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.update(id, updateRepositoryDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbGetRepositoryById(id: RepositoryEntity["id"]): Promise<RepositoryEntity | null> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.findOneBy({
            id: id
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}