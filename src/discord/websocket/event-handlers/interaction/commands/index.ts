import { APIApplicationCommandInteraction, APIApplicationCommandSubcommandGroupOption, ApplicationCommandType } from "discord-api-types/v10"
import discordHandleRegisterCommand from "./register"
import discordHandleUnregisterCommand from "./unregister";
import discordhandleCreateMacroFromDiscordToGithubCommand from "./create-macro/from-discord/to-github";
import discordhandleCreateMacroFromGithubToGithubCommand from "./create-macro/from-github/to-github";
import discordhandleCreateMacroFromGithubToDiscordCommand from "./create-macro/from-github/to-discord";

export default async function discordHandleApplicationCommandInteraction(data: APIApplicationCommandInteraction): Promise<void> {
    console.log(JSON.stringify(data))
    const interactionData = data.data
    if (interactionData.type == ApplicationCommandType.ChatInput) {
        switch(interactionData.name) {
            case "register": await discordHandleRegisterCommand(data); break
            case "unregister": await discordHandleUnregisterCommand(data); break
            case "create-macro": {
                const option1 = interactionData.options![0] as APIApplicationCommandSubcommandGroupOption
                const option2 = option1.options![0]
                switch(option1.name) {
                    case "from-discord": {
                        switch(option2.name) {
                            case "to-github": await discordhandleCreateMacroFromDiscordToGithubCommand(data); break
                        }
                    }
                    case "from-github": {
                        switch(option2.name) {
                            case "to-github": await discordhandleCreateMacroFromGithubToGithubCommand(data); break
                            case "to-discord": await discordhandleCreateMacroFromGithubToDiscordCommand(data); break
                        }
                    }
                }
                break
            }
        }
    }
    return
}