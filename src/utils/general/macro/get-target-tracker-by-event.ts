import MacroEntity from "../../../db/entity/macro.entity";
import DiscordEvents from "../../../enum/macro/discord-event";
import GithubEvents from "../../../enum/macro/github-event";
import MacroTarget from "../../../enum/macro/macro-target";

export default async function macroGetTargeted<O extends MacroTarget>(origin: O, event: O extends MacroTarget.DISCORD ? DiscordEvents : O extends MacroTarget.GITHUB ? GithubEvents : string, tracker: {
    github_repository: {
        owner: string,
        name: string
    }
} | {
    discord_channel_id: string
}) {
    return await MacroEntity.find({
        where: {
            event: {
                origin: origin,
                event: event
            },
            trackers: {
                ...tracker
            }
        },
        relations: {
            trackers: true,
            event: true
        }
    })
}