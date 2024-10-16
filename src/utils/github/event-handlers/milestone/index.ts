import { MilestoneEvent } from "@octokit/webhooks-types";

export default async function githubHandleMilestoneEvent(data: MilestoneEvent) {
    switch(data.action) {
        case "closed": break
        case "created": break
        case "deleted": break
        case "edited": break
        case "opened": break
    }
    return
}