import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import AppDataSource from "../../../../db/data-source";
import GithubIssueTrackEntity from "../../../../db/entity/issue-track.entity";
import discordSendMessageToChannel from "../../../discord/api/send-message";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import { APIMessage } from "discord-api-types/v10"

export default async function githubHandleIssuesOpenedEvent(data: IssuesOpenedEvent) {
    const issueRepository = AppDataSource.getRepository(GithubIssueTrackEntity)
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    const targetTracker = await trackerRepository.findOne({
        where: {
            github_repository: {
                owner: data.repository.owner.name,
                name: data.repository.name
            }
        }
    })
    if (!targetTracker) return
    //incorrect type prbbly, here ↓
    const targetMessage: APIMessage | null = await discordSendMessageToChannel(targetTracker.discord_channel_id, {
        content: `New issue was created`
    })
    if (!targetMessage) return
    const newIssue: GithubIssueTrackEntity = {
        id: data.issue.id,
        original_message: {
            id: targetMessage.id,
            tracker: targetTracker
        },
        github_repository: targetTracker.github_repository,
    }
    await issueRepository.save(newIssue)
    return
}