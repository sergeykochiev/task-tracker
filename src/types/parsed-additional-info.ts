type ParsedAdditionalInfo = Record<string, {
    value: string,
    include: {
        recursivename: string[]
        fetchfrom: string[]
        index: number
    }[]
}>

export default ParsedAdditionalInfo