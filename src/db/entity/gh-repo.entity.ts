import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import TrackerEntity from "./tracker.entity";

@Entity()
export default class GithubRepoEntity {
    @PrimaryColumn()
    gh_repo_id: number

    @Column()
    gh_hook_id: number
    
    @Column()
    ds_token_enc: string

    @Column()
    gh_hook_secret_enc: string

    @Column()
    slug: string
}