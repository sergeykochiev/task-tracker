import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import InstallationEntity from "./installation";

@Entity()
@Unique(["owner", "name"])
export default class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    owner: string

    @Column()
    name: string

    @ManyToOne(() => InstallationEntity, {
        nullable: true
    })
    @JoinColumn()
    installation?: InstallationEntity
}