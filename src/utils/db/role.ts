import AppDataSource from "../../db/data-source"
import RoleEntity from "../../db/entity/role"
import DatabaseError from "../../error/db/database.error"

export async function dbSaveRole(role: RoleEntity) {
    const roleRepository = AppDataSource.getRepository(RoleEntity)
    try {
        return await roleRepository.save(role)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}