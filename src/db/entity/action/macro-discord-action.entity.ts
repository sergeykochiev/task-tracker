import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MacroGithubEventEntity from "../event/macro-github-event.entity";
import GithubEventType from "../../../enum/github/event-type";
import DiscordMacroAction from "../../enum/discord-event-action";
import DiscordMacroActionInfoMap from "../../../types/db/discord-macro-action-info-map";

@Entity()
export default class MacroDiscordActionEntity<A extends DiscordMacroAction, T extends GithubEventType> {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: DiscordMacroAction
    })
    action: A

    @ManyToOne(() => MacroGithubEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    github_event: MacroGithubEventEntity<T>

    @Column({
        type: "varchar"
    })
    additional_info: DiscordMacroActionInfoMap[A]
}