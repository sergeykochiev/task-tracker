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
            await iterateOnEveryTrackerOfRepository(trackers, data.repository.full_name, async (tracker) => await githubPullRequestOpenedCallback(tracker, data))
            break
        }
        case "labeled": {
            if(!token) throw "No token"
            switch(data.label.name) {
                case GithubLabels.IN_PROGRESS: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.ON_REVIEW); break
                case GithubLabels.ON_REVIEW: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.IN_PROGRESS); break
                case GithubLabels.FEATURE: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.BUG); break
                case GithubLabels.BUG: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.FEATURE); break
                case GithubLabels.PRIORITY_LOW: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_MEDIUM, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_MEDIUM: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_HIGH); break
                case GithubLabels.PRIORITY_HIGH: await githubRemoveLabel(data.repository.full_name, data.number, token, GithubLabels.PRIORITY_LOW, GithubLabels.PRIORITY_MEDIUM); break
            }
            const issues = await githubGetIssuesOfPR(data.repository.owner.login, data.repository.name, data.number, token)
            for(let i = 0; i < issues.length; i++) {
                await githubOverwriteLabel(data.repository.full_name, issues[i], token, data.pull_request.labels)
            }
            break
        }
        case "review_requested": await iterateOnEveryTrackerOfRepository(trackers, data.repository.full_name, (tracker) => githubPullRequestReviewRequestedCallback(tracker, data)); break
    }
}