import discordSendMessageToChannel from "./send-message";

export default async function discordSendNotificationToChannel(channelId: string, dto: {
    title: string,
    content: string,
    role_to_ping?: string
}) {
    return await discordSendMessageToChannel(channelId, {
        content: dto.role_to_ping && `<@&${dto.role_to_ping}>`,
        embeds: [{
            title: "Notification: " + dto.title,
            description: dto.content,
        }]
    })
}