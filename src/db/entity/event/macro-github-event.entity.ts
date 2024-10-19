import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import GithubEventType from "../../../enum/github/event-type";
import GithubWebhookEventPayloadMap from "../../../types/github/webhook/payload/payload-map";
import TrackerEntity from "../tracker.entity";

@Entity()
export default class MacroGithubEventEntity<T extends GithubEventType> {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => TrackerEntity, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    tracker: TrackerEntity

    @Column({
        type: "enum",
        enum: GithubEventType
    })
    event: T

    @Column({
        nullable: true,
        default: null,
        type: "varchar"
    })
    action: "action" extends keyof GithubWebhookEventPayloadMap[T] ? GithubWebhookEventPayloadMap[T]["action"] : null
}