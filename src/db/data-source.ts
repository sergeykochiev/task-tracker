import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import MacroActionEntity from "./entity/macro-action.entity";
import MacroEventEntity from "./entity/macro-event.entity";
import DatabaseConfig from "../envcfg/db.config";
import MacroEntity from "./entity/macro.entity";
import { Init1730716863865 } from "./migration/1730716863865-init";
import { Uniquejsonb1730747883143 } from "./migration/1730747883143-uniquejsonb";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: false,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity, MacroActionEntity, MacroEventEntity, MacroEntity],
    subscribers: [],
    migrations: [Init1730716863865, Uniquejsonb1730747883143],
})

AppDataSource.initialize()

export default AppDataSource