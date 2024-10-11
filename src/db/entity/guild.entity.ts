import { Column, Entity, PrimaryColumn } from "typeorm";
import ConfigureStatus from "../enum/configure-status";

@Entity()
export default class GuildEntity {
    @PrimaryColumn()
    id: string

    @Column()
    configurator_id: string

    @Column()
    users_can_register: string

    @Column()
    roles_can_register: string

    @Column()
    configure_status: ConfigureStatus
}