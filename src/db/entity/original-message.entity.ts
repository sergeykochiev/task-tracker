import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import TrackerEntity from "./tracker.entity";
import IssueTrackEntity from "./issue-track.entity";

@Entity()
export default class OriginalMessageEntity {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => TrackerEntity, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        cascade: true,
        eager: true
    })
    @JoinColumn()
    tracker: TrackerEntity

    @ManyToOne(() => IssueTrackEntity, {
        onUpdate: "CASCADE",
        cascade: true,
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    issue: IssueTrackEntity
}