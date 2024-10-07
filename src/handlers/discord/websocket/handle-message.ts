import DiscordWebsocketMessageEvent from "../../../types/discord/websocket/message-event";
import { GatewayReceivePayload } from 'discord-api-types/v10';

export default async function handleDiscordGetawayMessage(event: DiscordWebsocketMessageEvent): Promise<void> {
    const [data, socket] = [event.data, event.target]
    let parsedData: GatewayReceivePayload
    try {
        parsedData = JSON.parse(data.toString())
    } catch(e) {
        console.error("Error parsing websocket message: ", e)
        return
    }
}