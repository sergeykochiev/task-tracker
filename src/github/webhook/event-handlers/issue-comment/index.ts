import { IssueCommentEvent } from "@octokit/webhooks-types";

export default async function githubHandleIssueCommentEvent(data: IssueCommentEvent) {
    switch(data.action) {
        case "created": break
        case "deleted": break
        case "edited": break
    }
}