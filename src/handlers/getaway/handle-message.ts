import { WebSocketEventMap } from "ws";

export default async function handleGetawayMessage(event: WebSocketEventMap['message']): Promise<void> {
    const [data, socket] = [event.data, event.target]

}