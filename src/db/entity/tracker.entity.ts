import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import GithubRepo from "./gh-repo.entity";
import DiscordGuild from "./dc-guild.entity";
import DiscordChannelEntity from "./dc-channel.entity";
import RegisterStatus from "../enum/register-status";

@Entity()
export default class TrackerEntity {
    @PrimaryColumn()
    @OneToOne(() => GithubRepo)
    @JoinColumn()
    gh_repo: GithubRepo

    @PrimaryColumn()
    @OneToOne(() => DiscordChannelEntity)
    @JoinColumn()
    dc_channel: DiscordChannelEntity
    
    @Column()
    time_created: string
    
    @Column()
    register_status: RegisterStatus
}