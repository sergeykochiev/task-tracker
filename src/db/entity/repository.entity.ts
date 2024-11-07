import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "GithubRepository" })
@Unique(["fullname"])
export default class RepositoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar"
    })
    fullname: string

    @Column({
        type: "varchar",
        nullable: true,
        default: null
    })
    installationId?: string

    getOwnerAndName() {
        return this.fullname.split("/")
    }
}