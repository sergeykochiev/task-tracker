import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class RoleEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
}