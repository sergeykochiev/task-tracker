import { InstallationEvent } from "@octokit/webhooks-types";
import githubHandleInstallationCreateEvent from "./create";

export default function githubHandleInstallationEvent(data: InstallationEvent) {
    switch(data.action) {
        case "created": githubHandleInstallationCreateEvent(data); break
    }
}