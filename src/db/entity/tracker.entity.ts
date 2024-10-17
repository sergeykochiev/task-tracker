import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import RegisterStatus from "../enum/register-status";
import GithubRepoEntity from "./repository.entity";
import RoleEntity from "./role";

@Entity()
export default class TrackerEntity {
    @PrimaryColumn()
    discord_channel_id: string

    @ManyToOne(() => GithubRepoEntity, {
        eager: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    github_repository: GithubRepoEntity

    @Column()
    discord_guild_id: string

    @Column()
    registrar_id: string
    
    @Column()
    time_created: string
    
    @Column()
    register_status: RegisterStatus

    @ManyToOne(() => RoleEntity, {
        nullable: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    })
    @JoinColumn()
    role_to_ping?: RoleEntity
}