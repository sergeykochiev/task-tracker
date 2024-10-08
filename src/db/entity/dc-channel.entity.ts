import { ManyToOne, PrimaryColumn } from "typeorm";
import DiscordGuildEntity from "./dc-guild.entity";

export default class DiscordChannelEntity {
    @PrimaryColumn()
    channel_id: number

    @ManyToOne(() => DiscordGuildEntity)
    guild_id: DiscordGuildEntity
}