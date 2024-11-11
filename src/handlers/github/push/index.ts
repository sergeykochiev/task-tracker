import { PushEvent } from "@octokit/webhooks-types";
import { githubPushCallback } from "./callbacks";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandlePushEvent(data: PushEvent) {
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    iterateOnEveryTrackerOfRepository(trackers, async tracker => await githubPushCallback(tracker, data))
}