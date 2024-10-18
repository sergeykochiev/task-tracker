import { DataSource } from "typeorm";
import DatabaseConfig from "../config/env/db.config";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import OriginalMessageEntity from "./entity/original-message.entity";
import IssueTrackEntity from "./entity/issue-track.entity";
import InstallationEntity from "./entity/installation";
import RoleEntity from "./entity/role";
import { Init1729181741692 } from "./migration/1729181741692-init";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: false,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity, OriginalMessageEntity, IssueTrackEntity, InstallationEntity, RoleEntity],
    subscribers: [],
    migrations: [Init1729181741692],
})

AppDataSource.initialize()

export default AppDataSource