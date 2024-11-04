import MatchType from "./match"

type ParsedAdditionalInfo = {
    matchType?: MatchType,
} & Record<string, {
    value: string,
    include: {
        recursivename: string[]
        fetchfrom: string[]
        arrayfrom: string[]
        index: number
    }[]
}>

export default ParsedAdditionalInfo