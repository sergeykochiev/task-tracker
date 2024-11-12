import { IssueCommentEvent } from "@octokit/webhooks-types";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandleIssueCommentEvent(data: IssueCommentEvent, tracker: TrackerEntity) {
    switch(data.action) {
        case "created": 
    }
}