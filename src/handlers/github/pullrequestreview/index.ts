import { PullRequestReviewEvent } from "@octokit/webhooks-types";
import githubGetInstallationAccessToken from "../../../utils/github/api/get-installation-access-token";
import githubAssignLabel from "../../../utils/github/api/assign-label";
import GithubLabels from "../../../enum/github-labels";
import TrackerEntity from "../../../db/entity/tracker.entity";

export default async function githubHandlePullRequestReviewEvent(data: PullRequestReviewEvent) {
    const token = await githubGetInstallationAccessToken(data.installation!.id)
    const trackers = await TrackerEntity.findBy({
        github_repository: { fullname: data.repository.full_name }
    })
    if(!trackers || !trackers.length) return
    switch(data.action) {
        case "dismissed": {
            if(!token) throw "No token"
            await githubAssignLabel(data.repository.full_name, data.pull_request.number, token, GithubLabels.ON_REVIEW)
            break
        }
    }
}