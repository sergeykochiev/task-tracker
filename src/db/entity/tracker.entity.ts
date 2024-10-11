import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import RegisterStatus from "../enum/register-status";
import GithubRepoEntity from "./repository.entity";
import DiscordGuildEntity from "./guild.entity";

@Entity()
export default class TrackerEntity {
    @PrimaryColumn()
    discord_channel_id: string

    @ManyToOne(() => GithubRepoEntity, { eager: true })
    @JoinColumn()
    github_repository: GithubRepoEntity

    @ManyToOne(() => DiscordGuildEntity, { eager: true })
    @JoinColumn()
    discord_guild: DiscordGuildEntity

    @Column()
    registrar_id: string
    
    @Column()
    time_created: string
    
    @Column()
    register_status: RegisterStatus
}