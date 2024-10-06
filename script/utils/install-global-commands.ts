import DiscordRequest from "../../src/utils/discord-request";

export default async function InstallGlobalCommands(appId: string, commands: Record<any, any>) {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${appId}/commands`;

    try {
        // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        await DiscordRequest(endpoint, { method: 'PUT', body: JSON.stringify(commands) });
    } catch (err) {
        console.error(err);
    }
}