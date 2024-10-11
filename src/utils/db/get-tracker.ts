import AppDataSource from "../../db/data-source";
import TrackerEntity from "../../db/entity/tracker.entity";
import DatabaseError from "../../error/db/database.error";

export default async function dbGetTracker(discordChannelid: string): Promise<TrackerEntity | null> {
    const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    try {
        return await trackerRepository.findOne({
            where: {
                discord_channel_id: discordChannelid
            }
        })
    } catch(e) {
        throw new DatabaseError(String(e))
    }
}