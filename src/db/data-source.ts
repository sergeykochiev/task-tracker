import { DataSource } from "typeorm";
import DatabaseConfig from "../config/env/db.config";
import TrackerEntity from "./entity/tracker.entity";
import RepositoryEntity from "./entity/repository.entity";
import OriginalMessageEntity from "./entity/original-message.entity";
import IssueTrackEntity from "./entity/issue-track.entity";
import GuildEntity from "./entity/guild.entity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: DatabaseConfig.HOST,
    port: DatabaseConfig.PORT,
    username: DatabaseConfig.USERNAME,
    password: DatabaseConfig.PASSWORD,
    database: DatabaseConfig.NAME,
    synchronize: true,
    logging: false,
    entities: [TrackerEntity, RepositoryEntity, OriginalMessageEntity, IssueTrackEntity, GuildEntity],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()

export default AppDataSource