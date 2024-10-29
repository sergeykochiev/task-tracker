import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import TrackerEntity from "./tracker.entity";
import MacroTarget from "../enum/macro-target";
import GithubEvents from "../enum/github-event";
import DiscordEvents from "../enum/discord-event";

@Entity({ name: "MacroEvent" })
@Unique(["tracker", "origin", "event"])
export default class MacroEventEntity<Origin extends MacroTarget> {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => TrackerEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    tracker: TrackerEntity

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