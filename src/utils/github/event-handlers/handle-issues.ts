import { IssuesEvent } from "@octokit/webhooks-types";
import discordSendMessageToChannel from "../../discord/send-message";
import AppDataSource from "../../../db/data-source";
import GithubIssueTrackEntity from "../../../db/entity/gh-issue-track.entity";

export default async function handleIssues(data: IssuesEvent) {
    // switch(data.action) {
    //     case GithubIssueAction.Assigned: break
    //     case GithubIssueAction.Closed: break
    //     case GithubIssueAction.Deleted: break
    //     case GithubIssueAction.Demilestoned: break
    //     case GithubIssueAction.Edited: break
    //     case GithubIssueAction.Labeled: break
    //     case GithubIssueAction.Locked: break
    //     case GithubIssueAction.Milestoned: break
    //     case GithubIssueAction.Opened: break
    //     case GithubIssueAction.Pinned: break
    //     case GithubIssueAction.Reopened: break
    //     case GithubIssueAction.Transferred: break
    //     case GithubIssueAction.Unassigned: break
    //     case GithubIssueAction.Unlabeled: break
    //     case GithubIssueAction.Unlocked: break
    //     case GithubIssueAction.Unpinned: break
    // }
    const issueRepository = AppDataSource.getRepository(GithubIssueTrackEntity)
    const targetIssue = await issueRepository.findOne({
        where: {
            gh_issue_id: data.issue.id
        }
    })
    if (!targetIssue) return
    await discordSendMessageToChannel(targetIssue.dc_channel.dc_channel_id, {
        content: `New issue was created`
    })
    return
}