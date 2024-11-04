import ParsedAdditionalInfo from "../../../types/parsed-additional-info";

export function macroGetValueFromResursiveName(record: any, resursivename: string[], idx: number = 0): any {
    const key = resursivename[idx]
    if(!key) return record
    record = record[key]
    if(record === null || record === undefined) {
        return null
    }
    return macroGetValueFromResursiveName(record, resursivename, idx+1)
}
async function macroValueFromIncludeObject(eventpayload: Record<string, any>, include: ParsedAdditionalInfo[string]["include"][0], fetchHeaders?: Record<string, any>): Promise<any> {
    if(include.fetchfrom.length) {
        const url = macroGetValueFromResursiveName(eventpayload, include.fetchfrom)
        if(url == null) return null
        const res = await fetch(url, {
            headers: fetchHeaders
        })
        if(!res.ok) return null
        eventpayload = await res.json()
    }
    if(include.arrayfrom.length) {
        const array = macroGetValueFromResursiveName(eventpayload, include.arrayfrom) as Array<any>
        if(!array.length) return null
        return array.map(elem => macroGetValueFromResursiveName(elem, include.recursivename))
    }
    return macroGetValueFromResursiveName(eventpayload, include.recursivename)
}

async function macroParseInclude(sourcePayload: Record<string, any>, initValue: string, accumulatedOffset: number, include: ParsedAdditionalInfo[string]["include"][0], fetchHeaders?: Record<string, any>,) {
    let value = await macroValueFromIncludeObject(sourcePayload, include, fetchHeaders)
    if(value == null) {
        // TODO separate those cases
        value = "*empty/unknown*"
    }
    return [accumulatedOffset + value.toString().length, initValue.slice(0, accumulatedOffset + include.index) + (Array.isArray(value) ? value.join(", ") : value) + initValue.slice(accumulatedOffset + include.index)]
}

async function macroParseField(sourcePayload: Record<string, any>, field: ParsedAdditionalInfo[string], shouldBeArrayified: boolean, fetchHeaders?: Record<string, any>): Promise<any> {
    let value = field.value
    let offset = 0
    for(let i = 0; i < field.include.length; i++) {
        [offset, value] = await macroParseInclude(sourcePayload, value, offset, field.include[i], fetchHeaders)
    }
    if(shouldBeArrayified) {
        return [value]
    }
    return value
}

export async function macroGetPayloadFromFields(eventPayload: Record<string, any>, info: ParsedAdditionalInfo, fetchHeaders?: Record<string, any>) {
    const payload: Record<keyof typeof info, any> = {}
    for(let entry in info) {
        payload[entry] = await macroParseField(eventPayload, info[entry], entry[0] === "_", fetchHeaders)
    }
    return payload
}

export async function macroGetMatches(eventPayload: Record<string, any>, match1: ParsedAdditionalInfo[string], match2: ParsedAdditionalInfo[string], fetchHeaders?: Record<string, any>): Promise<[any, string]> {
    return [await macroValueFromIncludeObject(eventPayload, match1.include[0], fetchHeaders), await macroParseField(eventPayload, match2, false, fetchHeaders)]
}