import MatchType from "./match"

type ParsedAdditionalInfo = {
    matchType?: MatchType,
} & Record<string, {
    value: string,
    include: {
        recursivename: string[],
        index: number
    }[]
}>

export default ParsedAdditionalInfo