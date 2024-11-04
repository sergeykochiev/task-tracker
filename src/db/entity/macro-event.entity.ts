import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import DiscordEvents from "../../enum/macro/discord-event";
import GithubEvents from "../../enum/macro/github-event";
import MacroTarget from "../../enum/macro/macro-target";

@Entity({ name: "MacroEvent" })
@Unique(["origin", "event"])
export default class MacroEventEntity<Origin extends MacroTarget = MacroTarget> extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
        type: "enum",
        enum: MacroTarget
    })
    origin: Origin

    @Column({
        type: "varchar",
        length: 30
    })
    event: Origin extends MacroTarget.DISCORD ? DiscordEvents : Origin extends MacroTarget.GITHUB ? GithubEvents : never
}