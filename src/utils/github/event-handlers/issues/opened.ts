import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import { APIMessage } from "discord-api-types/v10"
import { dbSaveIssueTrack } from "../../../db/issue-track";
import { dbSaveOriginalMessage } from "../../../db/original-message";
import discordSendTextMessageToChannel from "../../../discord/api/routes/messages/send-plain-text-as-message";
import discordSendTextMessageToChannelWithRefference from "../../../discord/api/routes/messages/send-text-message-to-channel-with-refference";
import { dbBulkGetTrackersBy } from "../../../db/tracker";

export default async function githubHandleIssuesOpenedEvent(data: IssuesOpenedEvent) {
    const targetTrackers = await dbBulkGetTrackersBy({
        github_repository: {
            owner: data.repository.owner.login,
            name: data.repository.name
        }
    })
    if (!targetTrackers.length) return
    const newIssue = await dbSaveIssueTrack({
        id: String(data.issue.id),
        github_repository: targetTrackers[0].github_repository,
        url: data.issue.url
    })
    for(let i = 0; i < targetTrackers.length; i++) {
        const targetTracker = targetTrackers[i]
        //incorrect type prbbly, here ↓
        const targetMessage: APIMessage | null = await discordSendTextMessageToChannel(targetTracker.discord_channel_id, `New issue: ${data.issue.title}`)
        await discordSendTextMessageToChannelWithRefference(targetTracker.discord_channel_id, `A new issue was opened!\n\nCheck the issue - ${data.issue.url}`, targetMessage.id)
        if (!targetMessage) continue
        await dbSaveOriginalMessage({
            id: targetMessage.id,
            issue: newIssue,
            tracker: targetTracker
        })
    }
    return
}