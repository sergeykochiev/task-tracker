export default class ApiRequestError extends Error {
    constructor(
        private status: number,
        message: string,
        private parsedData: object
    ) {
        const customMessage = `Status #${status} - ${message}`
        super(customMessage)
        this.name = "ApiRequestError"
    }

    public getStatus = () => this.status

    public getBody = () => this.parsedData
}