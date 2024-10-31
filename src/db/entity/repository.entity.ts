import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "GithubRepository" })
@Unique(["owner", "name"])
export default class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    owner: string

    @Column()
    name: string

    @Column({
        nullable: true,
        default: null
    })
    installationId?: string
}