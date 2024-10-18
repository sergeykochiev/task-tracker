import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import RepositoryEntity from "./repository.entity";

@Entity()
export default class IssueTrackEntity {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => RepositoryEntity, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn()
    github_repository: RepositoryEntity

    @Column()
    url: string
}