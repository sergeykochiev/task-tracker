import { UpdateResult } from "typeorm"
import AppDataSource from "../../db/data-source"
import RepositoryEntity from "../../db/entity/repository.entity"
import DatabaseError from "../../error/db/database.error"
import RepositoryEntityCredentialFields from "../../types/db/repository-credential-fields"

type UpdateRepositoryCredentialsDto = Partial<RepositoryEntity>
type SaveRepositoryWithoutCredentialsDto = Omit<RepositoryEntity, RepositoryEntityCredentialFields | "id">

export async function dbSaveRepositoryWithoutCredentials(saveRepositoryWithoutCredentialsDto: SaveRepositoryWithoutCredentialsDto): Promise<RepositoryEntity> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.save(saveRepositoryWithoutCredentialsDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbGetRepositoryByOwnerAndName(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]): Promise<RepositoryEntity | null> {
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

export async function dbUpdateRepository(id: RepositoryEntity["id"], updateRepositoryCredentialsDto: UpdateRepositoryCredentialsDto): Promise<UpdateResult> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.update(id, updateRepositoryCredentialsDto)
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
import { UpdateResult } from "typeorm"
import AppDataSource from "../../db/data-source"
import RepositoryEntity from "../../db/entity/repository.entity"
import DatabaseError from "../../error/db/database.error"

type UpdateRepositoryCredentialsDto = Partial<RepositoryEntity>

export async function dbSaveRepository(saveRepositoryDto: Omit<RepositoryEntity, "id">): Promise<RepositoryEntity> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.save(saveRepositoryDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbGetRepositoryByOwnerAndName(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]): Promise<RepositoryEntity | null> {
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

export async function dbUpdateRepository(id: RepositoryEntity["id"], updateRepositoryCredentialsDto: UpdateRepositoryCredentialsDto): Promise<UpdateResult> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.update(id, updateRepositoryCredentialsDto)
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