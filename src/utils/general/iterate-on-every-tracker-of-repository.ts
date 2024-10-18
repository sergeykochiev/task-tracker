import { log } from "console"
import TrackerEntity from "../../db/entity/tracker.entity"
import { databaseBulkGetTrackersBy } from "../db/tracker"

export default async function iterateOnEveryTrackerOfRepository(owner: string, name: string, callback: (tracker: TrackerEntity) => Promise<void>) {
    const getTrackersRes = await databaseBulkGetTrackersBy({
        github_repository: {
            owner: owner,
            name: name
        }
    })
    if (getTrackersRes.err) {
        log(getTrackersRes.err)
        return
    }
    getTrackersRes.data.map(callback)
}