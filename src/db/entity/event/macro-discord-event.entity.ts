import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GatewayDispatchEvents } from "discord-api-types/v10";
import TrackerEntity from "../tracker.entity";

@Entity()
export default class MacroDiscordEventEntity {
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
        enum: GatewayDispatchEvents
    })
    event: GatewayDispatchEvents
}