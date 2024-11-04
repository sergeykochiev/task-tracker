import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import { DiscordImportMacrosCommandInteraction } from "../../../../types/discord/command-interactions";
import discordReplyToInteraction from "../../../../utils/discord/api/interactions/reply-to-interaction";
import macroSaveFromFile from "../../../../utils/general/macro/save-from-file";

export default async function discordHandleImportMacrosCommand(data: APIChatInputApplicationCommandInteraction) {
    const fileAttachmentId = (data as DiscordImportMacrosCommandInteraction).data.options[0].value
    const fileRes = await fetch(data.data.resolved!.attachments![fileAttachmentId].url)
    if(!fileRes.ok) {
        await discordReplyToInteraction(data.id, data.token, {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "Error retrieving the file."
            }
        })
        return
    }
    const json = await fileRes.json()
    const res = await macroSaveFromFile(json, false, data.channel.id)
    await discordReplyToInteraction(data.id, data.token, {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Success!"
        }
    })
    return
}