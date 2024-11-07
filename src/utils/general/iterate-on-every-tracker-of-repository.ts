import TrackerEntity from "../../db/entity/tracker.entity"

export default async function iterateOnEveryTrackerOfRepository(trackers: TrackerEntity[], fullname: string, callback: (tracker: TrackerEntity) => Promise<void>) {
    console.log("GITHUB iterating over", trackers.length, "trackers")
    trackers.map(async tracker => {
        try {
            await callback(tracker)
        } catch(e) {
            console.error("GITHUB error on tracker", tracker.discord_channel_id, ":", e)
        }
    })
}