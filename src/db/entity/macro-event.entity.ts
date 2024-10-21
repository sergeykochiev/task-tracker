import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import GithubEventType from "../../enum/github/event-type";
import GithubWebhookEventPayloadMap from "../../types/github/webhook/payload/payload-map";
import TrackerEntity from "./tracker.entity";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import MacroTarget from "../enum/macro-target";

type GithubEventsActionsMap = {
    [K in GithubEventType]: "action" extends keyof GithubWebhookEventPayloadMap[K] ? GithubWebhookEventPayloadMap[K]["action"] : null
}

@Entity()
export default class MacroEventEntity<T extends GithubEventType | GatewayDispatchEvents> {
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
        enum: MacroTarget
    })
    origin: T extends GithubEventType ? MacroTarget.GITHUB : T extends GatewayDispatchEvents ? MacroTarget.DISCORD : never

    @Column({
        type: "varchar",
        length: 30
    })
    event: T extends GithubEventType ? Uppercase<`${T}${"action" extends keyof GithubWebhookEventPayloadMap[T] ? `-${GithubEventsActionsMap[T]}` : never}`> : T extends GatewayDispatchEvents ? T : string
}