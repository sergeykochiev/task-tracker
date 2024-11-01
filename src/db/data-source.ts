import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import RoleEntity from "./entity/role.entity";
import { Init1729181741692 } from "./migration/1729181741692-init";
import { Oneventchanges1729329967094 } from "./migration/1729329967094-oneventchanges";
import MacroActionEntity from "./entity/macro-action.entity";
import MacroEventEntity from "./entity/macro-event.entity";
import { Macro1730121588874 } from "./migration/1730121588874-macro";
import { Rename1730216807766 } from "./migration/1730216807766-rename";
import { Nojson1730314815291 } from "./migration/1730314815291-nojson";
import { Fetchingrequiredfield1730390114311 } from "./migration/1730390114311-fetchingrequiredfield";
import DatabaseConfig from "../envcfg/db.config";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: false,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity, RoleEntity, MacroActionEntity, MacroEventEntity],
    subscribers: [],
    migrations: [Init1729181741692, Oneventchanges1729329967094, Macro1730121588874, Rename1730216807766, Nojson1730314815291, Fetchingrequiredfield1730390114311],
})

AppDataSource.initialize()

export default AppDataSource