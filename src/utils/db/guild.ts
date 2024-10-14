import AppDataSource from "../../db/data-source";
import GuildEntity from "../../db/entity/guild.entity";
import DatabaseError from "../../error/db/database.error";

export async function dbGetGuildById(guildId: GuildEntity["id"]): Promise<GuildEntity | null> {
    const guildRepository = AppDataSource.getRepository(GuildEntity)
    try {
        return await guildRepository.findOneBy({
            id: guildId
        })
    } catch(e) {
        throw new DatabaseError(e as string)
    }
}