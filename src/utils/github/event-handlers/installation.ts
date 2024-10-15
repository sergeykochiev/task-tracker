import { InstallationEvent } from "@octokit/webhooks-types";
import githubHandleInstallationCreate from "./installation/create";

export default function githubHandleInstallationEvent(data: InstallationEvent) {
    switch(data.action) {
        case "created": githubHandleInstallationCreate(data); break
    }
}