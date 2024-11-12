import { InstallationEvent } from "@octokit/webhooks-types";
import { githubInstallationCreatedCallback, githubInstallationDeletedCallback, githubInstallationSuspendCallback, githubInstallationUnsuspendCallback } from "./callbacks";
import TrackerEntity from "../../../db/entity/tracker.entity";
import withExistingTracker from "../../../utils/discord/with-existing-tracker-middleware";

function iterateOverEachRepo<T extends InstallationEvent>(data: T, callbackEachTracker: (t: TrackerEntity, d: T) => Promise<void>) {
    data.repositories!.map(async (r) => await withExistingTracker({ repository_fullname: r.full_name }, (t) => callbackEachTracker(t, data)))
}

export default async function githubHandleInstallationEvent(data: InstallationEvent) {
    if(!data.repositories) throw "No repos changed"
    switch(data.action) {
        case "created": iterateOverEachRepo(data, githubInstallationCreatedCallback); break
        case "deleted": iterateOverEachRepo(data, githubInstallationDeletedCallback); break
        case "suspend": iterateOverEachRepo(data, githubInstallationSuspendCallback); break
        case "unsuspend": iterateOverEachRepo(data, githubInstallationUnsuspendCallback); break
    }
    
}