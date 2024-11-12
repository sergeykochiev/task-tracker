import { APIApplicationCommandInteraction, InteractionContextType } from "discord-api-types/v10"
import GITHUB_APP_INSTALL_URL from "../../../const/github/new-install-url"
import GITHUB_REPOSITORY_URL_REGEXP from "../../../const/github/repository-url-regexp"
import TrackerEntity from "../../../db/entity/tracker.entity"
import { DiscordRegisterCommandInteraction } from "../../../types/discord/command-interactions"
import discordMessageToInteraction from "../../../utils/discord/text-to-interaction"
import getFullnameFromRepositoryUrl from "../../../utils/general/get-owner-and-name-from-repo-url"
import githubCheckIfRepoHaveAnInstall from "../../../utils/github/check-if-repo-have-an-install"

export default async function discordHandleRegisterCommand(data: APIApplicationCommandInteraction) {
    console.log("DISCORD Starting registration process...")
    if (!(data.context == InteractionContextType.Guild) || !data.guild_id) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "This command can only be used inside a server"
        })
        return
    }
    const trackerByChannel = await TrackerEntity.findOneBy({ discord_channel_id: data.channel.id })
    if(trackerByChannel) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Channel already registered. To register again, /unregister first."
        })
        return
    }
    const commandOptions = (data as DiscordRegisterCommandInteraction).data.options
    const interactionDataRepositoryUrl = commandOptions[0].value 
    const role = commandOptions[1] ? commandOptions[1].value : undefined
    if (!interactionDataRepositoryUrl.match(GITHUB_REPOSITORY_URL_REGEXP)) {
        await discordMessageToInteraction(data.id, data.token, {
            content: `*${interactionDataRepositoryUrl}* is not a valid Github repository URL.`
        })
        return
    }
    const fullname = getFullnameFromRepositoryUrl(interactionDataRepositoryUrl)
    const trackerByRepo = await TrackerEntity.findOneBy({ repository_fullname: fullname })
    if(trackerByRepo) {
        await discordMessageToInteraction(data.id, data.token, {
            content: "Repository is already being tracked. If you are the owner and think this is a mistake, uninstall the app in your Github settings and try again."
        })
        return
    }
    const res = await githubCheckIfRepoHaveAnInstall(fullname)
    await TrackerEntity.upsert({
        discord_channel_id: data.channel.id,
        is_app_installed: res.hasInstall,
        repository_fullname: fullname,
        role_to_ping: role
    }, ["discord_channel_id"])
    if(res.hasInstall) {
        await discordMessageToInteraction(data.id, data.token, {
            content: `Registration complete.`
        })
        return
    }
    await discordMessageToInteraction(data.id, data.token, {
        content: `Registration initiated. You need to [install](<${GITHUB_APP_INSTALL_URL}>) TaskTracer app on Github.`
    })
}