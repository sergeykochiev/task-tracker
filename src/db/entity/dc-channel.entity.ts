import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import DiscordGuildEntity from "./dc-guild.entity";

@Entity()
export default class DiscordChannelEntity {
    @PrimaryColumn()
    dc_channel_id: number

    @ManyToOne(() => DiscordGuildEntity)
    dc_guild: DiscordGuildEntity
}