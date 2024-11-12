import { PullRequestReviewCommentEvent } from "@octokit/webhooks-types";
import { githubPullRequestReviewCommentOpenedCallback } from "./callbacks";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandlePullRequestReviewCommentEvent(data: PullRequestReviewCommentEvent, tracker: TrackerEntity) {
    switch(data.action) {
        case "created": await githubPullRequestReviewCommentOpenedCallback(tracker, data)
    }
}