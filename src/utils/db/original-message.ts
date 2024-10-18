import IssueTrackEntity from "../../db/entity/issue-track.entity";
import OriginalMessageEntity from "../../db/entity/original-message.entity";
import { makeDatabaseRequest } from "./repository-request";

export async function databaseSaveOriginalMessage(saveOriginalMessageDto: OriginalMessageEntity) {
    return await makeDatabaseRequest(OriginalMessageEntity, "save", saveOriginalMessageDto)
}

export async function databaseBulkGetOriginalMessagesByIssueId(issueId: IssueTrackEntity["id"]) {
    return await makeDatabaseRequest(OriginalMessageEntity, "findBy", {
        issue: {
            id: issueId
        }
    })
}