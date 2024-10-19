import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MacroGithubEventEntity from "../event/macro-github-event.entity";
import GithubEventType from "../../../enum/github/event-type";
import MacroDiscordEventEntity from "../event/macro-discord-event.entity";
import GithubMacroAction from "../../enum/github-event-action";
import GithubMacroActionInfoMap from "../../../types/db/github-macro-action-info-map";

@Entity()
export default class MacroGithubActionEntity<A extends GithubMacroAction, T extends GithubEventType> {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: GithubMacroAction
    })
    action: A

    @ManyToOne(() => MacroGithubEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true
    })
    @JoinColumn()
    github_event: MacroGithubEventEntity<T>

    @ManyToOne(() => MacroDiscordEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true
    })
    @JoinColumn()
    discord_event: MacroDiscordEventEntity
    
    @Column({
        type: "varchar"
    })
    additional_info: GithubMacroActionInfoMap[A]
}