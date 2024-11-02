import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import MacroActionEntity from "./entity/macro-action.entity";
import MacroEventEntity from "./entity/macro-event.entity";
import DatabaseConfig from "../envcfg/db.config";
import { Ver21730550280786 } from "./migration/1730550280786-ver2";
import { Tidyup1730552673407 } from "./migration/1730552673407-tidyup";
import TrackerMacroAction from "./entity/tracker-macro-action.entity";
import { Custommanytomany1730555594654 } from "./migration/1730555594654-custommanytomany";
import { Addroleback1730583040438 } from "./migration/1730583040438-addroleback";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: false,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity, MacroActionEntity, MacroEventEntity, TrackerMacroAction],
    subscribers: [],
    migrations: [Ver21730550280786, Tidyup1730552673407, Custommanytomany1730555594654],
})

AppDataSource.initialize()

export default AppDataSource