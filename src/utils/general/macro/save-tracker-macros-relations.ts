import AppDataSource from "../../../db/data-source"

type MacroTrackerRelation = {
    macroId: number,
    channelTrackerDiscordChannelId: string
}

export default async function macroSaveTrackerRelations(relations: MacroTrackerRelation[] | MacroTrackerRelation) {
    return await AppDataSource.createQueryBuilder().insert().into("macro_trackers_channel_tracker").values(relations).orIgnore().execute()
}