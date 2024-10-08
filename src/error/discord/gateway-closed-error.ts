import { GatewayCloseCodes } from "discord-api-types/v10";

export default class DiscordGatewayClosedError extends Error {
    constructor(code: GatewayCloseCodes, message?: string) {
        const customMessage = `Code #${code} - ${GatewayCloseCodes[code]}${message && `: ${message}`}`
        super(customMessage)
        this.name = "DiscordGatewayClosedError"
    }
}