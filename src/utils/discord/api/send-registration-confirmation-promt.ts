import DISCORD_DEFAULT_REGISTRATION_CONFIRMATION_PROMT from "../../../const/discord/default-registration-confirmation-promt";
import discordSendMessageToChannel from "./send-message";

export default async function discordSendRegistrationConfirmationPromt(channelId: string) {
    // return await discordReplyToInteraction(interactionId, interactionToken, {
    //     type: InteractionResponseType.ChannelMessageWithSource,
    //     data: DISCORD_DEFAULT_REGISTRATION_CONFIRMATION_PROMT
    // })
    return await discordSendMessageToChannel(channelId, DISCORD_DEFAULT_REGISTRATION_CONFIRMATION_PROMT)
}