import AppDataSource from "../../db/data-source";
import DatabaseError from "../../error/db/database.error";
import RepositoryEntity from "../../db/entity/repository.entity";
import RepositoryEntityCredentialFields from "../../types/db/repository-credential-fields";

type SaveRepositoryWithoutCredentialsDto = Omit<RepositoryEntity, RepositoryEntityCredentialFields | "id">

export default async function dbSaveRepositoryWithoutCredentials(saveRepositoryWithoutCredentialsDto: SaveRepositoryWithoutCredentialsDto): Promise<RepositoryEntity> {
    const repositoryRepository = AppDataSource.getRepository(RepositoryEntity)
    try {
        return await repositoryRepository.save(saveRepositoryWithoutCredentialsDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}