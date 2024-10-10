import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class GithubRepoEntity {
    @PrimaryColumn()
    repo_id: number

    @Column()
    gh_hook_id: number
    
    @Column()
    ds_token_enc: string

    @Column()
    gh_hook_secret_enc: string

    @Column()
    slug: string
}