import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import TrackerEntity from "./tracker.entity";
import MacroActionEntity from "./macro-action.entity";

@Entity({ name: "TrackerToMacroAction" })
export default class TrackerMacroAction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => TrackerEntity, {
        eager: true,
        nullable: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    tracker: TrackerEntity

    @ManyToOne(() => MacroActionEntity, {
        nullable: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    action: MacroActionEntity
}