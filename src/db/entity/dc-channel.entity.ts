import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import DiscordGuildEntity from "./dc-guild.entity";

@Entity()
export default class DiscordChannelEntity {
    @PrimaryColumn()
    channel_id: number

    @ManyToOne(() => DiscordGuildEntity)
    guild_id: DiscordGuildEntity
}