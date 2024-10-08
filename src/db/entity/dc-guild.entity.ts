import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class DiscordGuildEntity {
    @PrimaryColumn()
    guild_id: number

    @Column()
    users_can_register: string

    @Column()
    roles_can_register: string

    @Column()
    register_pending: boolean
}