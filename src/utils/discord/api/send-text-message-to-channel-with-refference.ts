import discordSendMessageToChannel from "./send-message";

export default async function discordSendTextMessageToChannelWithRefference(channelId: string, message: string, refferenceId: string) {
    await discordSendMessageToChannel(channelId, {
        content: message,
        message_reference: {
            message_id: refferenceId
        }
    })
    return
}