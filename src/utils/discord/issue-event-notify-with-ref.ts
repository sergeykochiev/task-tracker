import { IssuesEvent } from "@octokit/webhooks-types";
import OriginalMessageEntity from "../../db/entity/original-message.entity";
import discordSendMessageToChannel from "./api/messages/send-message";

export default async function discordIssueEventNotifyWithRef(originalMessage: OriginalMessageEntity, action: IssuesEvent["action"]) {
    const roleId = originalMessage.tracker.role_to_ping?.id
    return await discordSendMessageToChannel(originalMessage.tracker.discord_channel_id, {
        content: `${roleId && `<@&${roleId}>`} An issue was ${action}! - [Check the changes](${originalMessage.issue.url})`,
        message_reference: {
            message_id: originalMessage.id
        },
        allowed_mentions: {
            roles: roleId ? [roleId] : []
        }
    })
}