import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import { databaseBulkGetTrackersBy } from "../../../../utils/db/tracker";
import { databaseSaveIssueTrack } from "../../../../utils/db/issue-track";
import { databaseSaveOriginalMessage } from "../../../../utils/db/original-message";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import discordIssueEventNotifyWithRef from "../../../../utils/discord/issue-event-notify-with-ref";
import { log } from "console";
import { InteractionResponseType } from "discord-api-types/v10";
import discordSendMessageToChannel from "../../../../discord/api/messages/send-message";

export default async function githubHandleIssuesOpenedEvent(data: IssuesOpenedEvent) {
    const getTrackersRes = await databaseBulkGetTrackersBy({
        github_repository: {
            owner: data.repository.owner.login,
            name: data.repository.name
        }
    })
    if (getTrackersRes.err) {
        log(getTrackersRes.err)
        return
    }
    const targetTrackers = getTrackersRes.data
    if (!targetTrackers.length) return
    const saveIssueTrackRes = await databaseSaveIssueTrack({
        id: String(data.issue.id),
        github_repository: targetTrackers[0].github_repository,
        url: data.issue.html_url
    })
    if (saveIssueTrackRes.err) return
    targetTrackers.map(async (targetTracker: TrackerEntity) => {
        const originalMessageRes = await discordSendMessageToChannel(targetTracker.discord_channel_id, {
            content: `New issue: ${data.issue.title}`
        })
        if (originalMessageRes.err || !originalMessageRes.data.ok) {
            log(originalMessageRes.err)
            return
        }
        const originalMessageId = originalMessageRes.data.data.id
        const saveOriginalMessageRes = await databaseSaveOriginalMessage({
            id: originalMessageId,
            issue: saveIssueTrackRes.data,
            tracker: targetTracker
        })
        if (saveOriginalMessageRes.err) {
            log(saveOriginalMessageRes.err)
            return
        }
        const messageRefRes = await discordIssueEventNotifyWithRef(saveOriginalMessageRes.data, "opened")
        if (messageRefRes.err || messageRefRes.data.ok) return
    })
    return
}