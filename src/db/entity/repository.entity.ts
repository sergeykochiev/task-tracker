import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "GithubRepository" })
@Unique(["owner", "name"])
export default class RepositoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number

    @Column({
        type: "varchar"
    })
    owner: string

    @Column({
        type: "varchar"
    })
    name: string

    @Column({
        type: "varchar",
        nullable: true,
        default: null
    })
    installationId?: string
}