export default class DiscordApiRequestError extends Error {
    constructor(status: number, message: string) {
        const customMessage = `Status #${status} - ${message}`
        super(customMessage)
        this.name = "DiscordApiRequestError"
    }
}