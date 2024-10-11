import GithubWebhookCreateOptions from "./options"

interface GithubWebhookCreateResponseData extends GithubWebhookCreateOptions {
    type: string,
    id: number,
    updated_at: string,
    created_at: string,
    url: string,
    test_url: string,
    ping_url: string,
    deliveries_url: string,
    last_response: {
        code: number | null,
        status: string,
        message: string | null
    }
}

export default GithubWebhookCreateResponseData