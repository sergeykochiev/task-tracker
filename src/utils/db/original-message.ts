import AppDataSource from "../../db/data-source";
import IssueTrackEntity from "../../db/entity/issue-track.entity";
import OriginalMessageEntity from "../../db/entity/original-message.entity";
import DatabaseError from "../../error/db/database.error";

export async function dbSaveOriginalMessage(saveOriginalMessageEntityDto: OriginalMessageEntity): Promise<OriginalMessageEntity> {
    const messageRepository = AppDataSource.getRepository(OriginalMessageEntity)
    try {
        return await messageRepository.save(saveOriginalMessageEntityDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}

export async function dbBulkGetOriginalMessagesByIssueId(issueId: IssueTrackEntity["id"]): Promise<OriginalMessageEntity[]> {
    const messageRepository = AppDataSource.getRepository(OriginalMessageEntity)
    try {
        return await messageRepository.findBy({
            issue: {
                id: issueId
            }
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}