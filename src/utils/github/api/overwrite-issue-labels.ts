import githubGetIssuesOfPR from "./graphql/get-issues-of-pr"
import githubOverwriteLabel from "./overwrite-label"

export default async function overwriteIssuesLabels(fullname: string, number: number, labels: string[], token: string) {
    const issues = await githubGetIssuesOfPR(fullname, number, token)
    if(!issues) return null
    for(let i = 0; i < issues.length; i++) {
        await githubOverwriteLabel(fullname, issues[i], token, labels)
    }
}
    