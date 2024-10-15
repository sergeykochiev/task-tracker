import { APIMessageComponentSelectMenuInteraction, APIMessageRoleSelectInteractionData } from "discord-api-types/v10"

interface APIMessageComponentRoleSelectInteraction extends APIMessageComponentSelectMenuInteraction {
    data: APIMessageRoleSelectInteractionData
}

export default APIMessageComponentRoleSelectInteraction