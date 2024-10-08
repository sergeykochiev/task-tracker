import { DataSource } from "typeorm";
import DatabaseConfig from "../config/env/db.config";
import TrackerEntity from "./entity/tracker.entity";
import GithubRepoEntity from "./entity/gh-repo.entity";
import DiscordGuildEntity from "./entity/dc-guild.entity";
import DiscordChannelEntity from "./entity/dc-channel.entity";
import GithubIssueTrackEntity from "./entity/gh-issue-track.entity";

const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    database: DatabaseConfig.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [TrackerEntity, GithubRepoEntity, DiscordGuildEntity, DiscordChannelEntity, GithubIssueTrackEntity],
    subscribers: [],
    migrations: [],
})

export default AppDataSource