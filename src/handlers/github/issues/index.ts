import { IssuesEvent } from "@octokit/webhooks-types";
import { githubIssuesOpenedCallback } from "./callbacks";
import GithubLabels from "../../../enum/github-labels";
import githubGetInstallationAccessToken from "../../../utils/github/api/get-installation-access-token";
import githubRemoveLabel from "../../../utils/github/api/remove-label";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandleIssuesEvent(data: IssuesEvent) {
    const token = await githubGetInstallationAccessToken(data.installation!.id)
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    switch(data.action) {
        case "opened": iterateOnEveryTrackerOfRepository(trackers, async tracker => await githubIssuesOpenedCallback(tracker, data)); break
        case "labeled": {
            if(!token) throw "No token"
            switch(data.label!.name) {
                case GithubLabels.IN_PROGRESS: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.ON_REVIEW); break
                case GithubLabels.ON_REVIEW: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.IN_PROGRESS); break
                case GithubLabels.FEATURE: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.BUG); break
                case GithubLabels.BUG: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.FEATURE); break
                case GithubLabels.PRIORITY_LOW: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.PRIORITY_MEDIUM, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_MEDIUM: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_HIGH: githubRemoveLabel(data.repository.full_name, data.issue.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_MEDIUM); break
            }
            break
        }
    }
}