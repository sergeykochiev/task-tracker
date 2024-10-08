import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class GithubRepoEntity {
    @PrimaryColumn()
    repo_id: number

    @Column()
    hook_id: number
    
    @Column()
    token_enc: string

    @Column()
    slug: string
}