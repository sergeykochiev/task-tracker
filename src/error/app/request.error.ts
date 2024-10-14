export default class ApiRequestError extends Error {
    constructor(
        public status: number,
        message: string,
        public body: Record<string, any>
    ) {
        const customMessage = `Status #${status} - ${message}`
        super(customMessage)
        this.name = "ApiRequestError"
    }
}