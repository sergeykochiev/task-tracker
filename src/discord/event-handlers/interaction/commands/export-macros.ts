import { APIApplicationCommandInteraction, APIInteractionResponse, InteractionResponseType } from "discord-api-types/v10";
import MacroEntity from "../../../../db/entity/macro.entity";
import discordReplyToInteraction from "../../../../utils/discord/api/interactions/reply-to-interaction";
import { DISCORD_AUTH_HEADERS, DISCORD_ENDPOINTS, DISCORD_V10_API_ROOT } from "../../../../const/discord/api";

export default async function discordHandleExportMacrosCommand(data: APIApplicationCommandInteraction) {
    const macros = await MacroEntity.find({
        select: {
            additional_info: true,
            is_default: true,
            info_requires_fetching: true,
            event: {
                origin: true,
                event: true
            },
            action: {
                action: true,
                target: true
            }
        },
        where: {
            trackers: {
                discord_channel_id: data.channel.id
            },
            is_default: false
        }
    })
    if(!macros.length) {
        await discordReplyToInteraction(data.id, data.token, {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: "There are nothing to export as there are no macros created for this channel."
            }
        })
        return
    }
    const formData = new FormData()
    formData.append("files[0]", new Blob([JSON.stringify(macros, null, 2)]))
    formData.append("payload_json", JSON.stringify({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: "Here you go!",
            attachments: [
                {
                    id: 0,
                    filename: `tasktracker_export_${data.channel.id}.json`,
                    description: "Exported macro settings"
                }
            ]
        }
    } as APIInteractionResponse))
    await fetch(DISCORD_V10_API_ROOT + DISCORD_ENDPOINTS.INTERACTION_RESPONSE(data.id, data.token), {
        headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: DISCORD_AUTH_HEADERS.Authorization,
            "User-Agent": DISCORD_AUTH_HEADERS["User-Agent"]
        },
        method: "POST",
        body: formData
    })
    return
}