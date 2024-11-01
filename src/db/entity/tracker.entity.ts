import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import GithubRepoEntity from "./repository.entity";
import RoleEntity from "./role.entity";
import RegisterStatus from "../../enum/register-status";

@Entity({ name: "ChannelTracker" })
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
    
    @Column({
        type: "enum",
        enum: RegisterStatus
    })
    register_status: RegisterStatus

    @ManyToOne(() => RoleEntity, {
        nullable: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        eager: true,
        cascade: true
    })
    @JoinColumn()
    role_to_ping?: RoleEntity
}