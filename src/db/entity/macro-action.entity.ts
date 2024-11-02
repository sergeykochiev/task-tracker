import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MacroEventEntity from "./macro-event.entity";
import DiscordActions from "../../enum/macro/discord-action";
import GithubActions from "../../enum/macro/github-action";
import MacroTarget from "../../enum/macro/macro-target";
import ParsedAdditionalInfo from "../../types/parsed-additional-info";
import TrackerEntity from "./tracker.entity";
import TrackerMacroAction from "./tracker-macro-action.entity";

export type TargetBasedOn<Origin extends MacroTarget> = Origin extends MacroTarget.DISCORD ? MacroTarget.DISCORD : MacroTarget

@Entity({ name: "MacroAction" })
export default class MacroActionEntity<Origin extends MacroTarget = MacroTarget, Target extends MacroTarget =  TargetBasedOn<Origin>> extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
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
        orphanedRowAction: "nullify",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    event: MacroEventEntity<Origin>

    @Column({
        type: "varchar",
        nullable: true,
        default: null
    })
    additional_info?: string

    parseAdditionalInfo(): ParsedAdditionalInfo | null {
        if(!this.additional_info) return null
        return JSON.parse(this.additional_info)
    }

    @Column({
        type: "boolean",
        default: false
    })
    info_requires_fetching: boolean

    @Column({
        type: "boolean",
        default: false
    })
    is_default: boolean

    @OneToMany(() => TrackerMacroAction, (trackermacro) => trackermacro.action, {
        eager: true,
        cascade: true,
        nullable: true
    })
    tracker_macro_actions: TrackerMacroAction[]
}