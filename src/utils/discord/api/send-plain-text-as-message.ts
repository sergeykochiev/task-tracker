import discordSendMessageToChannel from "./send-message";

export default async function discordSendTextMessage(channelId: string, message: string) {
    return await discordSendMessageToChannel(channelId, {
        content: message
    })
}