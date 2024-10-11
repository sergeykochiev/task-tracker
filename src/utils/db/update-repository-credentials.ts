import { UpdateResult } from "typeorm";
import AppDataSource from "../../db/data-source";
import DatabaseError from "../../error/db/database.error";
import RepositoryEntity from "../../db/entity/repository.entity";
import RepositoryEntityCredentialFields from "../../types/db/repository-credential-fields";
import RepositoryEntityPrimaryKeyFields from "../../types/db/repository-primary-key-fields";

type UpdateRepositoryCredentialsDto = Pick<RepositoryEntity, RepositoryEntityCredentialFields>

export default async function dbUpdateRepositoryCredentials(id: number, updateRepositoryCredentialsDto: UpdateRepositoryCredentialsDto): Promise<UpdateResult> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.update(id, updateRepositoryCredentialsDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}