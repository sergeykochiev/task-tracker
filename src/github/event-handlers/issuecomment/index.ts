import { IssueCommentEvent } from "@octokit/webhooks-types";
import { githubIssueCommentCreatedCallback } from "./callbacks";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandleIssueCommentEvent(data: IssueCommentEvent) {
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    switch(data.action) {
        case "created": await iterateOnEveryTrackerOfRepository(trackers, data.repository.full_name, (tracker) => githubIssueCommentCreatedCallback(tracker, data))
    }
}