import DiscordConfig from "../../envcfg/discord.config";
import nacl from "tweetnacl";

export default function discordValidateWebhookSignature(body: string, signature: string, secret: string = DiscordConfig.PUBLIC_KEY): boolean {
    return nacl.sign.detached.verify(
        Buffer.from(body),
        Buffer.from(signature, "hex"),
        Buffer.from(secret, "hex")
    )
}