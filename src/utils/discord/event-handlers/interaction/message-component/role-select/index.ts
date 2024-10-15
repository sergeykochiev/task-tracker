import { DISCORD_REGISTRATION_ROLE_SELECT_ID } from "../../../../../../const/discord/default";
import discordHandlePingRoleSelect from "./ping-events-role";
import APIMessageComponentRoleSelectInteraction from "../../../../../../types/discord/api-message-component-role-select-interaction";

export default function githubHandleInteractionMessageComponentRoleSelect(data: APIMessageComponentRoleSelectInteraction) {
    switch(data.data.custom_id) {
        case DISCORD_REGISTRATION_ROLE_SELECT_ID: discordHandlePingRoleSelect(data); break
    }
}