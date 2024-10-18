import { log } from "console"
import OriginalMessageEntity from "../../db/entity/original-message.entity"
import { databaseBulkGetOriginalMessagesByIssueId } from "../db/original-message"

export default async function mapThroughIssueMessages(issueId: number, callback: (originalMessage: OriginalMessageEntity) => any) {
    const originalMessagesRes = await databaseBulkGetOriginalMessagesByIssueId(String(issueId))
    if (originalMessagesRes.err) {
        log(originalMessagesRes.err)
        return
    }
    console.log(issueId)
    originalMessagesRes.data.map(callback)
}