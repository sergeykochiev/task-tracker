import DiscordRequest from "./discord-request";

export default async function InstallGlobalCommands(appId: string, commands: Record<any, any>) {
    const endpoint = `applications/${appId}/commands`;
    try {
        // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
}