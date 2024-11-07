import TrackerEntity from "../../db/entity/tracker.entity";
import { GithubRepositoriesEvent } from "../../types/github/events";
import iterateOnEveryTrackerOfRepository from "../general/iterate-on-every-tracker-of-repository";

export default async function githubHandleMultiRepoTrackerSpecificEvent<T extends GithubRepositoriesEvent>(trackers: TrackerEntity[], data: T, callback: (tracker: TrackerEntity, data: T) => Promise<void>) {
    if(!data.repositories) return
    data.repositories.map(async (repository) => {
        try {
            await iterateOnEveryTrackerOfRepository(trackers, repository.full_name, (tracker) => callback(tracker, data))
        } catch(e) {}
    })
}