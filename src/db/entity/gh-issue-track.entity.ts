import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import GithubRepoEntity from "./gh-repo.entity";
import DiscordChannelEntity from "./dc-channel.entity";

@Entity()
export default class GithubIssueTrackEntity {
    @PrimaryColumn()
    issue_id: number

    @Column()
    dc_original_message_id: number

    @ManyToOne(() => GithubRepoEntity)
    @JoinColumn()
    gh_repo_id: GithubRepoEntity

    @ManyToOne(() => DiscordChannelEntity)
    @JoinColumn()
    dc_channel_id: DiscordChannelEntity
}