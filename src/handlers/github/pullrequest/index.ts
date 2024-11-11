import { PullRequestEvent } from "@octokit/webhooks-types";
import { githubPullRequestOpenedCallback, githubPullRequestReviewRequestedCallback } from "./callbacks";
import githubGetInstallationAccessToken from "../../../utils/github/api/get-installation-access-token";
import githubAssignLabel from "../../../utils/github/api/assign-label";
import GithubLabels from "../../../enum/github-labels";
import githubRemoveLabel from "../../../utils/github/api/remove-label";
import githubGetIssuesOfPR from "../../../utils/github/api/graphql/get-issues-of-pr";
import githubOverwriteLabel from "../../../utils/github/api/overwrite-label";
import TrackerEntity from "../../../db/entity/tracker.entity";
import iterateOnEveryTrackerOfRepository from "../../../utils/general/iterate-on-every-tracker-of-repository";
import overwriteIssuesLabels from "../../../utils/github/api/overwrite-issue-labels";

export default async function githubHandlePullRequestEvent(data: PullRequestEvent) {
    const token = await githubGetInstallationAccessToken(data.installation!.id)
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    switch(data.action) {
        case "opened": {
            if(!token) throw "No token"
            await githubAssignLabel(data.repository.full_name, data.number, token, GithubLabels.IN_PROGRESS)
            await iterateOnEveryTrackerOfRepository(trackers, async (tracker) => await githubPullRequestOpenedCallback(tracker, data))
            break
        }
        case "labeled": {
            if(!token) throw "No token"
            switch(data.label.name) {
                case GithubLabels.IN_PROGRESS: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.ON_REVIEW); break
                case GithubLabels.ON_REVIEW: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.IN_PROGRESS); break
                case GithubLabels.FEATURE: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.BUG); break
                case GithubLabels.BUG: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.FEATURE); break
                case GithubLabels.PRIORITY_LOW: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_MEDIUM, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_MEDIUM: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_HIGH: githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_MEDIUM); break
                default: overwriteIssuesLabels(data.repository.full_name, data.pull_request.number, data.pull_request.labels.map(label => label.name), token)
            }
            break
        }
        case "review_requested": iterateOnEveryTrackerOfRepository(trackers, async tracker => await githubPullRequestReviewRequestedCallback(tracker, data)); break
        case "unlabeled": {
            if(!token) throw "No token"
            overwriteIssuesLabels(data.repository.full_name, data.pull_request.number, data.pull_request.labels.map(label => label.name), token)
        }
    }
}