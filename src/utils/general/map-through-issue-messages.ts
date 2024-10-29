import { log } from "console"
import OriginalMessageEntity from "../../db/entity/original-message.entity"
import { makeDatabaseRequest } from "../db/repository-request"

export default async function mapThroughIssueMessages(issueId: number, callback: (originalMessage: OriginalMessageEntity) => any) {
    const originalMessagesRes = await makeDatabaseRequest(OriginalMessageEntity, "findBy", {
        issue: {
            id: String(issueId)
        }
    })
    if (originalMessagesRes.err !== null) {
        log(originalMessagesRes.err)
        return
    }
    originalMessagesRes.data.map(callback)
}