import { InstallationEvent } from "@octokit/webhooks-types";
import githubHandleMultiRepoTrackerSpecificEvent from "../../../utils/github/handle-multirepo-tracker-specific-event";
import { githubInstallationCreatedCallback, githubInstallationDeletedCallback, githubInstallationSuspendCallback, githubInstallationUnsuspendCallback } from "./callbacks";
import RepositoryEntity from "../../../db/entity/repository.entity";

export default async function githubHandleInstallationEvent(data: InstallationEvent) {
    switch(data.action) {
        case "created": {
            if(!data.repositories) throw "No repos changed"
            data.repositories?.map(async repository => {
                await RepositoryEntity.update({
                    fullname: repository.full_name
                }, {
                    installationId: String(data.installation.id)
                })
            })
            await githubHandleMultiRepoTrackerSpecificEvent(data, githubInstallationCreatedCallback)
            break
        }
        case "deleted": await githubHandleMultiRepoTrackerSpecificEvent(data, githubInstallationDeletedCallback); break
        case "suspend": await githubHandleMultiRepoTrackerSpecificEvent(data, githubInstallationSuspendCallback); break
        case "unsuspend": await githubHandleMultiRepoTrackerSpecificEvent(data, githubInstallationUnsuspendCallback); break
    }
}