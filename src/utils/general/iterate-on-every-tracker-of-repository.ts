import { log } from "console"
import TrackerEntity from "../../db/entity/tracker.entity"
import { makeDatabaseRequest } from "../../db/repository-request"

export default async function iterateOnEveryTrackerOfRepository(owner: string, name: string, callback: (tracker: TrackerEntity) => Promise<void>) {
    const getTrackersRes = await makeDatabaseRequest(TrackerEntity, "findBy", {
        github_repository: {
            owner: owner,
            name: name
        }
    })
    if (getTrackersRes.err !== null) {
        log(getTrackersRes.err)
        return
    }
    getTrackersRes.data.map(callback)
}