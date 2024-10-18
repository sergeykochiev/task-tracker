import IssueTrackEntity from "../../db/entity/issue-track.entity";
import { makeDatabaseRequest } from "./repository-request";

export async function databaseSaveIssueTrack(saveIssueTrackDto: IssueTrackEntity) {
    return await makeDatabaseRequest(IssueTrackEntity, "save", saveIssueTrackDto)
}