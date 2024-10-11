export default class RegistrationFailedError extends Error {
    constructor(
        private reason: string
    ) {
        const customMessage = `Reason - ${reason}`
        super(customMessage)
        this.name = "ApiRequestError"
    }

    public getReason = () => this.reason
}