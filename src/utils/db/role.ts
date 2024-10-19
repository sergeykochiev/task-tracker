import RoleEntity from "../../db/entity/role.entity"
import { makeDatabaseRequest } from "./repository-request"

export async function databaseSaveRole(saveRoleDto: RoleEntity) {
    return await makeDatabaseRequest(RoleEntity, "save", saveRoleDto)
}