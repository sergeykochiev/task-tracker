import GithubEventType from "../../../enum/github/event-type"

interface GithubWebhookCreateOptions {
    name: "web",
    // Use web to create a webhook. Default: web. This parameter only accepts the value web.

    config: {
        url: string
        // The URL to which the payloads will be delivered.

        content_type: string
        // The media type used to serialize the payloads. Supported values include json and form. The default is form.

        secret: string
        // If provided, the secret will be used as the key to generate the HMAC hex digest value for delivery signature headers.

        insecure_ssl: string | number
        // Determines whether the SSL certificate of the host for url will be verified when delivering payloads. Supported values include 0 (verification is performed) and 1 (verification is not performed). The default is 0. We strongly recommend not setting this to 1 as you are subject to man-in-the-middle and other attacks.
    },
    // Key/value pairs to provide settings for this webhook.

    events: GithubEventType[],
    // Determines what events the hook is triggered for.
    // Default: ["push"]

    active: boolean
    // Determines if notifications are sent when the webhook is triggered. Set to true to send notifications.
    // Default: true
}
//source -- https://docs.github.com/en/rest/repos/webhooks?apiVersion=2022-11-28#create-a-repository-webhook

export default GithubWebhookCreateOptions