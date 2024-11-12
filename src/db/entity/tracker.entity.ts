import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity({ name: "channel_tracker" })
@Unique(["repository_fullname"])
export default class TrackerEntity extends BaseEntity {
    @PrimaryColumn({
        type: "varchar"
    })
    discord_channel_id: string

    @Column()
    repository_fullname: string
    
    @Column()
    is_app_installed: boolean

    @Column({
        type: "varchar",
        nullable: true,
        default: null
    })
    role_to_ping?: string
}