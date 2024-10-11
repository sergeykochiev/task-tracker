import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["owner", "name"])
export default class RepositoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    owner: string

    @Column()
    name: string

    @Column({ default: null })
    webhook_id?: number

    @Column({ default: null })
    webhook_secret?: string

    @Column({ default: null })
    github_token?: string

    @Column()
    slug: string
}