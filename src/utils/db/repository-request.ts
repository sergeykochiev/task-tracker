import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import AppDataSource from "../../db/data-source";
import { ErrorWrapperReturnType, wrapErrorAsync } from "../general/wrap-error";

type AllowedMethods = keyof Pick<Repository<ObjectLiteral>, "save" | "update" | "findBy" | "findOneBy" | "delete" | "findOneById">

export async function makeDatabaseRequest<E extends ObjectLiteral, M extends AllowedMethods>(entity: EntityTarget<E>, method: M, ...args: Parameters<Repository<E>[M]>): Promise<ErrorWrapperReturnType<Awaited<ReturnType<Repository<E>[M]>>>> {
    const repository = AppDataSource.getRepository(entity)
    // @ts-ignore: Parameters can't infer types with generics
    return wrapErrorAsync(repository[method].bind(repository), ...args)
}