import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import DatabaseConfig from "../envcfg/db.config";
import { Init1730914997016 } from "./migration/1730914997016-init";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: false,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity],
    subscribers: [],
    migrations: [Init1730914997016],
})

export default AppDataSource