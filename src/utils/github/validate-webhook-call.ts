import GithubAppConfig from "../../envcfg/github.config";

function hexToBytes(hex: string) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes;
}

const encoder = new TextEncoder()

export default async function githubValidateWebhookSignature(body: string, signature: string, secret: string = GithubAppConfig.WEBHOOK_SECRET): Promise<boolean> {
    const secretBytes = encoder.encode(secret)
    const bodyBytes = encoder.encode(body)
    const signatureBytes = hexToBytes(signature)
    const cryptoAlgorithm = {
        name: "HMAC",
        hash: {
            name: 'SHA-256'
        }
    }
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        secretBytes,
        cryptoAlgorithm,
        false,
        ["sign", "verify"]
    )
    return await crypto.subtle.verify(
        cryptoAlgorithm.name,
        cryptoKey,
        signatureBytes,
        bodyBytes
    )
}