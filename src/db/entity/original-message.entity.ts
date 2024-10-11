import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import TrackerEntity from "./tracker.entity";

@Entity()
export default class OriginalMessageEntity {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => TrackerEntity)
    tracker: TrackerEntity
}