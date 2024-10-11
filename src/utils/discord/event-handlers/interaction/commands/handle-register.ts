import { APIApplicationCommandInteraction, ButtonStyle, ComponentType, InteractionContextType, InteractionResponseType } from "discord-api-types/v10"
import discordReplyToInteractionWithText from "../../../helpers/send-plain-text-as-interaction-reply"
import RegisterStatus from "../../../../../db/enum/register-status"
import dbGetGuildById from "../../../../db/get-guild-by-id"
import DiscordRegisterCommandInteraction from "../../../../../types/discord/register-command-interaction"
import dbSaveTracker from "../../../../db/save-tracker"
import discordReplyToInteraction from "../../../helpers/reply-to-interaction"
import dbSaveRepositoryWithoutCredentials from "../../../../db/save-repository-without-credentials"

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    if (!(data.context == InteractionContextType.Guild)) discordReplyToInteractionWithText(data.id, data.token, "This command can only be used inside a server")
    const targetGuild = await dbGetGuildById(data.guild_id!)
    if (!targetGuild) {
        discordReplyToInteractionWithText(data.id, data.token, "Your server isn't configured, please, use the /configure command!")
        return
    }   
    const targetRepositoryUrl = (data as DiscordRegisterCommandInteraction).data.options![0].value
    const urlParts = targetRepositoryUrl.split("/")
    const urlPartsLength = urlParts.length
    const targetUserId = data.member!.user.id
    const [targetRepositoryOwner, targetRepositoryName] = [urlParts[urlPartsLength - 2], urlParts[urlPartsLength - 1]]
    const repoSlug = `${targetRepositoryOwner}_${targetRepositoryName}`
    const targetRepo = await dbSaveRepositoryWithoutCredentials({
        owner: targetRepositoryOwner,
        name: targetRepositoryName,
        slug: repoSlug
    })
    await dbSaveTracker({
        discord_channel_id: data.channel.id,
        github_repository: targetRepo,
        discord_guild: targetGuild,
        registrar_id: targetUserId,
        time_created: `${new Date().getTime()}`,
        register_status: RegisterStatus.PendingToken
    })
    // const targetWebhook = await githubCreateWebhook(targetRepositoryOwner, targetRepositoryName, githubToken, {
    //     name: "web",
    //     config: {
    //         url: `${AppConfig.HOST}/${repoSlug}`,
    //         content_type: "application/json",
    //         secret: GithubConfig.WEBHOOK_SECRET,
    //         insecure_ssl: 0
    //     },
    //     events: GITHUB_DEFAULT_WEBHOOK_EVENTS,
    //     active: true
    // })
    // if (!targetWebhook) return
    // await dbUpdateRepository({
    //     id: targetRepoId,
    //     webhook_id: targetWebhook.id,
    //     webhook_secret: GithubConfig.WEBHOOK_SECRET,
    //     slug: repoSlug
    // })
    
    // const tagretRegistrar = data.member!.user
    // const interactionChannel = data.channel
    // const trackerRepository = AppDataSource.getRepository(TrackerEntity)
    // try {
    //     await trackerRepository.save({
    //         discord_channel_id: interactionChannel.id,
    //         registrar_id: tagretRegistrar.id,
    //         time_created: (new Date()).toString(),
    //         register_status: RegisterStatus.PendingRepo,
    //     })
    // } catch(e) {
    //     throw new DatabaseError(e as string)
    // }
    // await discordReplyToInteractionWithText(data.id, data.token, "Registration initiated! Check your DMs for further instructions.")
    // const dm = await discordCreateDMChannel(targetUserId)
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "In order for the bot to track things that happen in your repository you need to create and provide a fine-granted access token with following permissions: \n\n- Webhooks (Read and Write)\n\nMake sure to select your repository in \"Repository access\" section beforehand. While we encrypt your tokens before saving them, it's recommended to select only those permissions and only one repository that you want to track events from in order to maintain security.",
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            custom_id: `repository_token_alert_confirmation_deny`,
                            label: "Wait, this was not part of my plans! (Abort)",
                            style: ButtonStyle.Danger
                        },
                        {
                            type: ComponentType.Button,
                            custom_id: `repository_token_alert_confirmation_confirm`,
                            label: "Submit",
                            style: ButtonStyle.Primary
                        }
                    ]
                }
            ]            
        }

    })
    return
}