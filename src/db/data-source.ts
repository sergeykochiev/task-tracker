import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import DatabaseConfig from "../envcfg/db.config";
import { Init1731248233800 } from "./migration/1731248233800-init";
import { Removetimecreated1731248372905 } from "./migration/1731248372905-removetimecreated";

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
    migrations: [Init1731248233800, Removetimecreated1731248372905],
})

export default AppDataSource