import { Column, Entity, PrimaryColumn } from "typeorm";
import RegisterTypes from "../enum/register-status";
import RegisterStatus from "../enum/register-status";

@Entity()
export default class DiscordGuildEntity {
    @PrimaryColumn()
    dc_guild_id: number

    @Column()
    users_can_register: string

    @Column()
    roles_can_register: string

    @Column()
    register_status: RegisterStatus
}