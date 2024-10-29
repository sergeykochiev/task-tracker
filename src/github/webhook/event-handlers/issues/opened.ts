import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import discordIssueEventNotifyWithRef from "../../../../utils/discord/issue-event-notify-with-ref";
import { log } from "console";
import { InteractionResponseType } from "discord-api-types/v10";
import discordSendMessageToChannel from "../../../../discord/api/messages/send-message";
import { makeDatabaseRequest } from "../../../../utils/db/repository-request";
import IssueTrackEntity from "../../../../db/entity/issue-track.entity";
import OriginalMessageEntity from "../../../../db/entity/original-message.entity";

export default async function githubHandleIssuesOpenedEvent(data: IssuesOpenedEvent) {
    const getTrackersRes = await makeDatabaseRequest(TrackerEntity, "findBy", {
        github_repository: {
            owner: data.repository.owner.login,
            name: data.repository.name
        }
    })
    if (getTrackersRes.err !== null) {
        log(getTrackersRes.err)
        return
    }
    const targetTrackers = getTrackersRes.data
    if (!targetTrackers.length) return
    const saveIssueTrackRes = await makeDatabaseRequest(IssueTrackEntity, "save", {
        id: String(data.issue.id),
        github_repository: targetTrackers[0].github_repository,
        url: data.issue.html_url
    })
    if (saveIssueTrackRes.err !== null) return
    targetTrackers.map(async (targetTracker: TrackerEntity) => {
        const originalMessageRes = await discordSendMessageToChannel(targetTracker.discord_channel_id, {
            content: `New issue: ${data.issue.title}`
        })
        if (originalMessageRes.err !== null || !originalMessageRes.data.ok) {
            log(originalMessageRes.err)
            return
        }
        const originalMessageId = originalMessageRes.data.data.id
        const saveOriginalMessageRes = await makeDatabaseRequest(OriginalMessageEntity, "save", {
            id: originalMessageId,
            issue: saveIssueTrackRes.data,
            tracker: targetTracker
        })
        if (saveOriginalMessageRes.err !== null) {
            log(saveOriginalMessageRes.err)
            return
        }
        const messageRefRes = await discordIssueEventNotifyWithRef(saveOriginalMessageRes.data, "opened")
        if (messageRefRes.err !== null || messageRefRes.data.ok) return
    })
    return
}