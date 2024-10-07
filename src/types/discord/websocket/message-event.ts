import { WebSocketEventMap } from "ws";

type WebSocketMessageEvent = WebSocketEventMap['message']

interface DiscordWebsocketMessageEvent extends WebSocketMessageEvent {}

export default DiscordWebsocketMessageEvent