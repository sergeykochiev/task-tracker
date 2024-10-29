import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MacroEventEntity from "./macro-event.entity";
import MacroTarget from "../enum/macro-target";
import GithubActions from "../enum/github-action";
import DiscordActions from "../enum/discord-action";

export type TargetBasedOn<Origin extends MacroTarget> = Origin extends MacroTarget.DISCORD ? MacroTarget.DISCORD : MacroTarget

@Entity({ name: "MacroAction" })
export default class MacroActionEntity<Origin extends MacroTarget, Target extends TargetBasedOn<Origin>> {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 30
    })
    action: Target extends MacroTarget.DISCORD ? DiscordActions : Target extends MacroTarget.GITHUB ? GithubActions : never

    @Column({
        type: "enum",
        enum: MacroTarget
    })
    target: Target

    @ManyToOne(() => MacroEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true
    })
    @JoinColumn()
    event: MacroEventEntity<Origin>

    @Column({
        type: "json",
        nullable: true,
        default: null
    })
    additional_info?: string
}