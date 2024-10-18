import { FindOptionsWhere } from "typeorm"
import RepositoryEntity from "../../db/entity/repository.entity"
import { makeDatabaseRequest } from "./repository-request"

export async function databaseSaveRepository(saveRepositoryDto: Omit<RepositoryEntity, "id">) {
    return makeDatabaseRequest(RepositoryEntity, "save", saveRepositoryDto)
}

export async function databaseBulkGetRepositoriesBy(where: FindOptionsWhere<RepositoryEntity>) {
    return await makeDatabaseRequest(RepositoryEntity, "findBy", where)
}

export async function databaseGetRepositoryByOwnerAndName(owner: RepositoryEntity["owner"], name: RepositoryEntity["name"]) {
    return await makeDatabaseRequest(RepositoryEntity, "findOneBy", {
        owner: owner,
        name: name
    })
}

export async function databaseUpdateRepository(id: RepositoryEntity["id"], updateRepositoryDto: Partial<Omit<RepositoryEntity, "id">>) {
    return await makeDatabaseRequest(RepositoryEntity, "update", id, updateRepositoryDto)
}

export async function databaseGetRepositoryById(id: RepositoryEntity["id"]) {
    return await makeDatabaseRequest(RepositoryEntity, "findOneBy", {
        id: id
    })
}