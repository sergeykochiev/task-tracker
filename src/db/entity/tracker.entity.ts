import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import GithubRepoEntity from "./repository.entity";
import RegisterStatus from "../../enum/register-status";

@Entity({ name: "ChannelTracker" })
export default class TrackerEntity extends BaseEntity {
    @PrimaryColumn({
        type: "varchar"
    })
    discord_channel_id: string

    @ManyToOne(() => GithubRepoEntity, {
        eager: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn()
    github_repository: GithubRepoEntity

    @Column({
        type: "timestamp"
    })
    time_created: string
    
    @Column({
        type: "enum",
        enum: RegisterStatus
    })
    register_status: RegisterStatus

    @Column({
        type: "varchar",
        nullable: true,
        default: null
    })
    role_to_ping?: string
}