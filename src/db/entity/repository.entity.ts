import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import InstallationEntity from "./installation.entity";

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
        nullable: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        eager: true,
        cascade: true
    })
    @JoinColumn()
    installation?: InstallationEntity
}