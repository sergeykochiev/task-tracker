import AppDataSource from "../../db/data-source";
import IssueTrackEntity from "../../db/entity/issue-track.entity";
import DatabaseError from "../../error/db/database.error";

export async function dbSaveIssueTrack(saveIssueTrackEntityDto: IssueTrackEntity): Promise<IssueTrackEntity> {
    const issueTrackRepository = AppDataSource.getRepository(IssueTrackEntity)
    try {
        return await issueTrackRepository.save(saveIssueTrackEntityDto)
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}