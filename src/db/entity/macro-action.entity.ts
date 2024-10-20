import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import GithubEventType from "../../enum/github/event-type";
import GithubMacroAction from "../enum/github-event-action";
import MacroEventEntity from "./macro-event.entity";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import GithubMacroActionInfoMap from "../../types/db/github-macro-action-info-map";
import DiscordMacroActionInfoMap from "../../types/db/discord-macro-action-info-map";
import DiscordMacroAction from "../enum/discord-event-action";
import MacroTarget from "../enum/macro-target";

@Entity()
export default class MacroActionEntity<A extends GithubMacroAction | DiscordMacroAction, T extends GithubEventType | GatewayDispatchEvents> {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 30
    })
    action: A extends GithubMacroAction ? GithubMacroAction : A extends DiscordMacroAction ? DiscordMacroAction : never

    @Column({
        type: "enum",
        enum: MacroTarget
    })
    target: T extends GithubMacroAction ? MacroTarget.GITHUB : T extends DiscordMacroAction ? MacroTarget.DISCORD : never

    @ManyToOne(() => MacroEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true
    })
    @JoinColumn()
    event: A extends GithubMacroAction ? MacroEventEntity<T> : A extends DiscordMacroAction ? MacroEventEntity<GatewayDispatchEvents> : string

    @Column({
        type: "varchar"
    })
    additional_info: A extends GithubMacroAction ? GithubMacroActionInfoMap[A] : A extends DiscordMacroAction ? DiscordMacroActionInfoMap[A] : string
}