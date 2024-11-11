import discordSendMessageToChannel from "./send-message";

export default async function discordSendNotificationToChannel(channelId: string, dto: {
    title: string,
    content: string
}) {
    return await discordSendMessageToChannel(channelId, {
        embeds: [{
            title: "Notification: " + dto.title,
            description: dto.content,
        }]
    })
}