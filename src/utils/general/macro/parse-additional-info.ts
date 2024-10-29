type ParsedAdditionalInfo = Record<string, {
    value: string,
    include: {
        recursivename: string[]
        fetchfrom: string[]
        index: number
    }[]
}>

export default function macroParseAdditionalInfo(additionalInfo: Record<string, any>): ParsedAdditionalInfo {
    const values = Object.keys(additionalInfo)
    for(let key = 0; key < values.length; key++) {
        const value = additionalInfo[values[key]]
        let newvalue = ""
        let stack = false
        let include = []
        let currvar: string[] = [""]
        let varindex = -1
        let currfetchslice = -1
        for(let i = 0; i < value.length; i++) {
            const char: string = value[i]
            if(stack && !char.match(/[a-z]|[A-Z]|-|>|./)) {
                varindex = -1
                currfetchslice = 0
                newvalue += currvar.join(".")
                currvar = [""]
                stack = false
            }
            if(char == "{") {
                if(stack) {
                    newvalue += currvar.join(".")
                    currvar = [""]
                }
                varindex = i
                stack = true
                continue
            }
            if(stack && char == ".") {
                currvar.push("")
                continue
            }
            if(stack && char == "}") {
                stack = false
                include.push({
                    recursivename: currfetchslice >= 0 ? currvar.slice(currfetchslice) : currvar,
                    fetchfrom: currfetchslice >= 0 ? currvar.slice(0, currfetchslice) : [],
                    index: varindex
                })
                varindex = -1
                currfetchslice = 0
                currvar = [""]
                continue
            }
            if(stack && char == "-") {
                if(i != value.length - 1 && value[i + 1] == ">") {
                    currfetchslice = currvar.length
                    currvar.push("")
                    i++
                    continue
                }
                varindex = -1
                currfetchslice = 0
                newvalue += currvar.join(".")
                currvar = [""]
                stack = false
            }
            if(stack) {
                currvar[currvar.length - 1] += char
                continue
            }
            newvalue += char
        }
        additionalInfo[values[key]] = {
            value: newvalue,
            include: include
        }
    }
    return additionalInfo
}