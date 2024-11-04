import macroGetCurrentCountForTracker from "./get-current-count-for-tracker";
import macroParseAdditionalInfo from "./parse-additional-info";
import macroSaveTrackerRelations from "./save-tracker-macros-relations";
import macroCascadeSave from "./upsert-full";

export default async function macroSaveFromFile(filedata: any[], additionalInfoIsUnparsed: boolean = true, channelId?: string) {
    if(!Array.isArray(filedata)) throw "Inner data is not an array"
    const length = filedata.length
    let maxcount = 10
    if(channelId) {
        const currCount = await macroGetCurrentCountForTracker(channelId)
        if(currCount >= 10) return 0
        maxcount -= currCount
    }
    filedata.map(async (data, index) => {
        if(maxcount <= 0) throw `Saved only ${index} macros: macro limit exceeded`
        if(additionalInfoIsUnparsed) {
            const parsed = macroParseAdditionalInfo(data.additional_info);
            [data.additional_info, data.shouldBeFetched] = [parsed.additionalInfo, parsed.shouldBeFetched]
        }
        try {
            const id = await macroCascadeSave(data)
            if(channelId) {
                macroSaveTrackerRelations({
                    macroId: id,
                    channelTrackerDiscordChannelId: channelId
                })
            }
        } catch(e) {
            throw `Error at entry ${index + 1}: ${e}`
        }
        maxcount--
    })
    return length
}