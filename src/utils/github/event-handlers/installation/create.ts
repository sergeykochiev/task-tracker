import { InstallationCreatedEvent, Organization } from "@octokit/webhooks-types";
import { dbGetRepositoryByOwnerAndName, dbUpdateRepository } from "../../../db/repository";
import InstallationEntity from "../../../../db/entity/installation";
import { dbBulkGetTrackersBy, dbUpdateTrackerStatus } from "../../../db/tracker";
import discordSendTextMessageToChannel from "../../../discord/api/routes/messages/send-plain-text-as-message";
import discordSendMessageToChannel from "../../../discord/api/routes/messages/send-message";
import { ComponentType } from "discord-api-types/v10";
import { DISCORD_REGISTRATION_ROLE_SELECT_ID } from "../../../../const/discord/default";
import RegisterStatus from "../../../../db/enum/register-status";

export default async function githubHandleInstallationCreate(data: InstallationCreatedEvent & {
    organization?: Organization
}) {
    if (!data.repositories) return
    const newInstallation: InstallationEntity = {
        id: String(data.installation.id),
        user_id: String(data.sender.id),
        organization_id: data.organization && String(data.organization.id)
    }
    const owner = data.organization ? data.organization.login : data.sender.login
    data.repositories.map(async (repository) => {
        const targetRepository = await dbGetRepositoryByOwnerAndName(owner, repository.name).catch()
        if (!targetRepository) return
        await dbUpdateRepository(targetRepository.id, {
            installation: newInstallation 
        })
        const trackers = await dbBulkGetTrackersBy({
            github_repository: {
                id: targetRepository.id
            }
        })
        trackers.map(async (targetTracker) => {
            await discordSendMessageToChannel(targetTracker.discord_channel_id, {
                content: "Github App successfully installed. Now select the role you want to ping on events:",
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.RoleSelect,
                                custom_id: DISCORD_REGISTRATION_ROLE_SELECT_ID,
                                max_values: 1,
                                min_values: 1
                            }
                        ]
                    }
                ]
            })
            await dbUpdateTrackerStatus(targetTracker.discord_channel_id, RegisterStatus.PendingRole)
        })
    })
    return
}