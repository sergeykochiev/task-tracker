import discordSendFollowupMessage from "./send-followup-message";

export default async function discordSendFollowupTextMessage(interactionToken: string, message: string) {
    return await discordSendFollowupMessage(interactionToken, {
        content: message
    })
}