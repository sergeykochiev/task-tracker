import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import ParsedAdditionalInfo from "../../types/parsed-additional-info";
import MacroEventEntity from "./macro-event.entity";
import MacroActionEntity from "./macro-action.entity";
import TrackerEntity from "./tracker.entity";

@Entity({ name: "Macro" })
@Unique(["action", "event", "additional_info"])
export default class MacroEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => MacroEventEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    event: MacroEventEntity

    @ManyToOne(() => MacroActionEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn()
    action: MacroActionEntity

    @Column({
        type: "jsonb",
        nullable: true,
        default: null
    })
    additional_info?: string

    @Column({
        type: "boolean",
        default: false,
    })
    info_requires_fetching?: boolean

    @Column({
        type: "boolean",
        default: false
    })
    is_default: boolean

    @ManyToMany(() => TrackerEntity, {
        eager: true,
        cascade: true,
        nullable: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinTable()
    trackers?: TrackerEntity[]

    parseAdditionalInfo(): ParsedAdditionalInfo | null {
        if(!this.additional_info) return null
        return JSON.parse(this.additional_info)
    }
}