import { InstallationEvent } from "@octokit/webhooks-types";
import githubHandleInstallationCreateEvent from "./create";
import githubHandleInstallationDeletedEvent from "./deleted";
import githubHandleInstallationSuspendEvent from "./suspend";
import githubHandleInstallationUnsuspendEvent from "./unsuspend";

export default function githubHandleInstallationEvent(data: InstallationEvent) {
    switch(data.action) {
        case "created": githubHandleInstallationCreateEvent(data); break
        case "deleted": githubHandleInstallationDeletedEvent(data); break
        case "suspend": githubHandleInstallationSuspendEvent(data); break
        case "unsuspend": githubHandleInstallationUnsuspendEvent(data); break
    }
}