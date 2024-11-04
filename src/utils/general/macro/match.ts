import MatchType from "../../../types/match";

export default function macroMatch(matchType: MatchType, match1: any, match2: any): boolean {
    console.log("FROM MATCH:", match1, match2, matchType)
    switch(matchType) {
        case "equal": return match1 == match2;
        case "notEqual": return match1 != match2;
        case "has": return Array.isArray(match1) && match1.includes(match2);
        case "notHas": return Array.isArray(match1) && !match1.includes(match2);
        case "exists": return (match1 !== undefined && match1 !== null);
        default: return false
    }
}