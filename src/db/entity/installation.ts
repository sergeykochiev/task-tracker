import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class InstallationEntity {
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column({
        nullable: true,
        default: null
    })
    organization_id?: string
}