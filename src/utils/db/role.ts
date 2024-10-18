import RoleEntity from "../../db/entity/role"
import { makeDatabaseRequest } from "./repository-request"

export async function databaseSaveRole(saveRoleDto: RoleEntity) {
    return await makeDatabaseRequest(RoleEntity, "save", saveRoleDto)
}