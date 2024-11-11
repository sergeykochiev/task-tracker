import { InstallationEvent, Repository } from "@octokit/webhooks-types";
import { githubInstallationCreatedCallback, githubInstallationDeletedCallback, githubInstallationSuspendCallback, githubInstallationUnsuspendCallback } from "./callbacks";
import RepositoryEntity from "../../../db/entity/repository.entity";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";
import TrackerEntity from "../../../db/entity/tracker.entity";
import githubCreateBaseLabels from "../../../utils/github/api/create-base-labels";

function iterateOverEachRepo<T extends InstallationEvent>(data: T, callbackEachRepo?: (fullname: string, data: T) => Promise<void>, callbackEachTracker?: (t: TrackerEntity, d: T) => Promise<void>) {
    data.repositories!.map(async repository => {
        callbackEachRepo && await callbackEachRepo(repository.full_name, data)
        const trackers = await TrackerEntity.findBy({
            github_repository: {
                fullname: repository.full_name
            }
        })
        callbackEachTracker && await iterateOnEveryTrackerOfRepository(trackers, async tracker => await callbackEachTracker(tracker, data))
    })
}

export default async function githubHandleInstallationEvent(data: InstallationEvent) {
    if(!data.repositories) throw "No repos changed"
    switch(data.action) {
        case "created": iterateOverEachRepo(data, async (f, d) => await githubCreateBaseLabels(f, d.installation.id), githubInstallationCreatedCallback); break
        case "deleted": iterateOverEachRepo(data, undefined, githubInstallationDeletedCallback); break
        case "suspend": iterateOverEachRepo(data, undefined, githubInstallationSuspendCallback); break
        case "unsuspend": iterateOverEachRepo(data, undefined, githubInstallationUnsuspendCallback); break
    }
    
}