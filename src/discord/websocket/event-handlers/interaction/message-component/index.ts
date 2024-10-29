import { APIMessageComponentInteraction, ComponentType } from "discord-api-types/v10";
import APIMessageComponentRoleSelectInteraction from "../../../../../types/discord/api-message-component-role-select-interaction";
import githubHandleInteractionMessageComponentRoleSelect from "./role-select";

export default function githubHandleInteractionMessageComponent(data: APIMessageComponentInteraction) {
    switch(data.data.component_type) {
        case ComponentType.RoleSelect: githubHandleInteractionMessageComponentRoleSelect(data as APIMessageComponentRoleSelectInteraction)
    }
    return
}