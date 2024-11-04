import AppDataSource from "../../../db/data-source";

export default async function macroGetCurrentCountForTracker(channelId: string) {
    return await AppDataSource.createQueryBuilder().select("macroId").from("macro_trackers_channel_tracker", "rel").where("rel.channelTrackerDiscordChannelId = :channelId", {
        channelId: channelId
    }).getCount()
}