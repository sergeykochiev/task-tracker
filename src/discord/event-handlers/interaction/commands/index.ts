import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData, ApplicationCommandType, InteractionResponseType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import discordHandleCreateMacroCommand from "./create-macro";
import discordHandleDebugMacroCommand from "./debug";
import discordHandleAssignDefaultsMacroCommand from "./assign-defaults";
import withExistingTracker from "../../../../utils/discord/with-existing-tracker-middleware";
import discordHandleExportMacrosCommand from "./export-macros";
import discordHandleImportMacrosCommand from "./import-macros";
import discordReplyToInteraction from "../../../../utils/discord/api/interactions/reply-to-interaction";
import { wrapErrorAsync } from "../../../../utils/general/error-wrapper";
import TrackerEntity from "../../../../db/entity/tracker.entity";
import RegisterStatus from "../../../../enum/register-status";

async function failRegistration(channelId: string) {
    await wrapErrorAsync(() => TrackerEntity.update(channelId, {
        register_status: RegisterStatus.Failed
    }))
}

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log("Handling command")
    const interactionData = data.data
    if (interactionData.type !== ApplicationCommandType.ChatInput) return
    try {
        switch(interactionData.name) {
            case "register": {
                try {
                    await discordHandleRegisterCommand(data)
                } catch(e) {
                    await failRegistration(data.channel.id)
                    throw e
                }
                break
            }
            case "unregister": await withExistingTracker(data, discordHandleUnregisterCommand); break
            case "create-macro": await withExistingTracker(data, discordHandleCreateMacroCommand); break
            case "debug": await discordHandleDebugMacroCommand(data); break
            case "assign-defaults": await withExistingTracker(data, discordHandleAssignDefaultsMacroCommand); break
            case "export-macros": await withExistingTracker(data, discordHandleExportMacrosCommand); break
            case "import-macros": await withExistingTracker(data as APIChatInputApplicationCommandInteraction, discordHandleImportMacrosCommand); break
        }
    } catch(e) {
        await discordReplyToInteraction(data.id, data.token, {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: `Error handling ${interactionData.name} command: ${e}`
            }
        })
    }
    return
}