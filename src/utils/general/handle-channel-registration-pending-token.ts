import { APIModalSubmitInteraction } from "discord-api-types/v10"
import createAndSaveNewGithubWebhookForRepository from "./create-and-save-new-webhook"
import RegisterStatus from "../../db/enum/register-status"
import discordSendTextMessage from "../discord/api/send-plain-text-as-message"
import handleChannelRegistrationFailure from "./handle-channel-registration-failure"
import ApiRequestError from "../../error/app/request.error"
import RegistrationFailedError from "../../error/app/registration-failed.error"
import DatabaseError from "../../error/db/database.error"
import { dbBulkGetTrackersByRegistrarId, dbUpdateTrackerStatusById } from "../db/tracker"
import { dbUpdateRepository } from "../db/repository"

export default async function handleChannelRegistrationPendingToken(data: APIModalSubmitInteraction) {
    const targetTracker = await dbBulkGetTrackersByRegistrarId(data.user!.id)
    if (!targetTracker || targetTracker.register_status != RegisterStatus.PendingToken) return
    try {
        await dbUpdateRepository(targetTracker.github_repository.id, {
            github_token: data.data.components[0].components[0].value
        })
        await createAndSaveNewGithubWebhookForRepository(targetTracker.github_repository.id)
        await dbUpdateTrackerStatusById(targetTracker.discord_channel_id, RegisterStatus.Registered)
        await discordSendTextMessage(targetTracker.discord_channel_id, "Registration complete! Issues are going to flow in, starting now.")
    } catch(e) {
        await handleChannelRegistrationFailure(targetTracker.discord_channel_id)
        if (e instanceof ApiRequestError) {
            switch(e.status) {
                case 404: {
                    throw new RegistrationFailedError("Cannot authenticate with provided token, please verify if it is correct and have nessesarry permissions assigned")
                }
            }
            throw new RegistrationFailedError(`API error - ${e.body.message}`)
        }
        if (e instanceof DatabaseError) {
            throw new RegistrationFailedError("Database error")
        }
        throw e
    }
    return
}