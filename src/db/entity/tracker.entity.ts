import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import GithubRepoEntity from "./repository.entity";
import RegisterStatus from "../../enum/register-status";
import MacroActionEntity from "./macro-action.entity";
import TrackerMacroAction from "./tracker-macro-action.entity";

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

    @OneToMany(() => TrackerMacroAction, (trackermacro) => trackermacro.tracker, {
        cascade: true,
        nullable: true
    })
    tracker_macro_actions: TrackerMacroAction[]
    
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