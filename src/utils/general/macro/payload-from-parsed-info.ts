import ParsedAdditionalInfo from "../../../types/parsed-additional-info";
import makeRequest from "../request";

export function getValueFromResursiveName(record: any, resursivename: string[]): string | null {
    const key = resursivename.shift()
    if(!key) return String(record)
    record = record[key]
    if(record === null || record === undefined) {
        return null
    }
    return getValueFromResursiveName(record, resursivename)
}
async function templateToValue(eventpayload: Record<string, any>, include: ParsedAdditionalInfo[string]["include"][0], fetchHeaders?: Record<string, any>): Promise<string | null> {
    if(include.fetchfrom.length) {
        const url = getValueFromResursiveName(eventpayload, include.fetchfrom)
        if(url == null) return null
        const res = await makeRequest(url, {
            headers: fetchHeaders
        })
        if(res.err !== null) return null
        eventpayload = res.data
    }
    return getValueFromResursiveName(eventpayload, include.recursivename)
}

export default async function macroPayloadFromParsedInfo(eventPayload: Record<string, any>, info: ParsedAdditionalInfo, fetchHeaders?: Record<string, any>) {
    const payload: Record<keyof typeof info, any> = {}
    for(let entry in info) {
        let finalValue = info[entry].value
        for(let i = 0; i < info[entry].include.length; i++) {
            const value = await templateToValue(eventPayload, info[entry].include[i], fetchHeaders)
            finalValue = finalValue.slice(0, info[entry].include[i].index) + value + finalValue.slice(info[entry].include[i].index)
        }
        if(entry[0] == "_") {
            payload[entry.slice(1)] = [finalValue]
            continue
        }
        payload[entry] = finalValue
    }
    return payload
}