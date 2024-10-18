import InstallationEntity from "../../db/entity/installation"
import { makeDatabaseRequest } from "./repository-request"

export async function databaseSaveInstallation(installation: InstallationEntity) {
    return await makeDatabaseRequest(InstallationEntity, "save", installation)
}

export async function databaseDeleteInstallation(id: InstallationEntity["id"]) {
    return await makeDatabaseRequest(InstallationEntity, "delete", id)
}