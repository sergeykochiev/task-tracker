import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import DiscordActions from "../../enum/macro/discord-action";
import GithubActions from "../../enum/macro/github-action";
import MacroTarget from "../../enum/macro/macro-target";

export type TargetBasedOn<Origin extends MacroTarget> = Origin extends MacroTarget.DISCORD ? MacroTarget.DISCORD : MacroTarget

@Entity({ name: "MacroAction" })
@Unique(["action", "target"])
export default class MacroActionEntity<Origin extends MacroTarget = MacroTarget, Target extends MacroTarget =  TargetBasedOn<Origin>> extends BaseEntity {
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
}