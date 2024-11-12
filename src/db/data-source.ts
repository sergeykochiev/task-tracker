import { DataSource } from "typeorm";
import TrackerEntity from "./entity/tracker.entity";
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
    entities: [TrackerEntity],
    subscribers: [],
    migrationsRun: true,
    migrations: ["**/db/migration/*.js"],
})

export default AppDataSource