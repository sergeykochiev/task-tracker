import { IssuesOpenedEvent } from "@octokit/webhooks-types";
import AppDataSource from "../../../../db/data-source";
import GithubIssueTrackEntity from "../../../../db/entity/gh-issue-track.entity";
import discordSendMessageToChannel from "../../../discord/send-message";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import { APIMessage } from "discord-api-types/v10"

export default async function githubHandleIssuesOpenedEvent(data: IssuesOpenedEvent) {
    // const issueRepository = AppDataSource.getRepository(GithubIssueTrackEntity)
    // const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    // const targetTracker = await trackerRepository.findOne({
    //     where: {
    //         gh_repo: {
    //             gh_repo_id: data.repository.id
    //         }
    //     }
    // })
    // if (!targetTracker) return
    // const targetChannel = targetTracker.dc_channel
    //incorrect type prbbly, here ↓
    const targetMessage: APIMessage | null = await discordSendMessageToChannel("1292208485555245175", {
        content: `New issue was created`
    })
    // if (!targetMessage) return
    // const newIssue: GithubIssueTrackEntity = {
    //     gh_issue_id: data.issue.id,
    //     dc_original_message_id: targetMessage.id,
    //     gh_repo: targetTracker.gh_repo,
    //     dc_channel: targetChannel
    // }
    // await issueRepository.save(newIssue)
    return
}