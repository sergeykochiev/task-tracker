import { getValueFromResursiveName } from "../utils/general/macro/payload-from-parsed-info"

const CASES = [
    {
        args: [
            {
                house: {
                    room: {
                        length: 1
                    }
                }
            },
            ["house", "room", "length"]
        ],
        output: "1"
    }
]

const RESULTS = []

for(const acase in CASES) {
    //@ts-ignore
    RESULTS.push(getValueFromResursiveName(CASES[acase].args[0], CASES[acase].args[1]))
}

console.log(RESULTS)