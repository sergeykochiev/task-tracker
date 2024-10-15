import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import RepositoryEntity from "./repository.entity";
import OriginalMessageEntity from "./original-message.entity";

@Entity()
export default class IssueTrackEntity {
    @PrimaryColumn()
    id: string

    // @ManyToOne(() => OriginalMessageEntity)
    // original_message: OriginalMessageEntity

    @ManyToOne(() => RepositoryEntity)
    @JoinColumn()
    github_repository: RepositoryEntity

    @Column()
    url: string
}