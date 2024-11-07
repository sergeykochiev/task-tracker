import { PullRequestReviewCommentEvent } from "@octokit/webhooks-types";
import { githubPullRequestReviewCommentOpenedCallback } from "./callbacks";
import TrackerEntity from "../../../db/entity/tracker.entity";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";

export default async function githubHandlePullRequestReviewCommentEvent(data: PullRequestReviewCommentEvent) {
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    switch(data.action) {
        case "created": await iterateOnEveryTrackerOfRepository(trackers, data.repository.full_name, (tracker) => githubPullRequestReviewCommentOpenedCallback(tracker, data))
    }
}