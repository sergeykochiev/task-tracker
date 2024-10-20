import { LabelEvent } from "@octokit/webhooks-types";

export default async function githubHandleLabelEvent(data: LabelEvent) {
    switch(data.action) {
        case "created": break
        case "deleted": break
        case "edited": break
    }
    return
}