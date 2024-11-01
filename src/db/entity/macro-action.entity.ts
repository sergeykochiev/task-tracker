import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MacroEventEntity from "./macro-event.entity";
import DiscordActions from "../../enum/macro/discord-action";
import GithubActions from "../../enum/macro/github-action";
import MacroTarget from "../../enum/macro/macro-target";

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
        type: "varchar",
        nullable: true,
        default: null
    })
    additional_info?: string

    parseAdditionalInfo() {
        if(!this.additional_info) return null
        return JSON.parse(this.additional_info)
    }

    @Column({
        default: false
    })
    info_requires_fetching: boolean
}