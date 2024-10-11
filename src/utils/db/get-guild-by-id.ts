import AppDataSource from "../../db/data-source";
import GuildEntity from "../../db/entity/guild.entity";
import DatabaseError from "../../error/db/database.error";

export default async function dbGetGuildById(guildId: string): Promise<GuildEntity | null> {
    const guildRepository = AppDataSource.getRepository(GuildEntity)
    try {
        return await guildRepository.findOne({
            where: {
                id: guildId
            }
        })
    } catch(e) {
        throw new DatabaseError(e as string)
    }
}