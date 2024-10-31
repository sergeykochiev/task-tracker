import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "DiscordRole" })
export default class RoleEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}