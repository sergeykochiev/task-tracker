import { PushEvent } from "@octokit/webhooks-types";
import { githubPushCallback } from "./callbacks";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandlePushEvent(data: PushEvent, tracker: TrackerEntity) {
    await githubPushCallback(tracker, data)
}