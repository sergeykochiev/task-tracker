import discordSendMessageToChannel from "./send-message";

export default async function discordSendTextMessageToChannel(channelId: string, message: string) {
    return await discordSendMessageToChannel(channelId, {
        content: message
    })
}