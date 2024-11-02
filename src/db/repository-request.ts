import { EntityTarget, ObjectLiteral, Repository, FindManyOptions } from "typeorm";
import AppDataSource from "./data-source";
import { ErrorWrapperReturnType, wrapErrorAsync } from "../utils/general/error-wrapper";

type AllowedMethods = keyof Pick<Repository<ObjectLiteral>, "save" | "update" | "findBy" | "findOneBy" | "delete" | "findOneById" | "find">

export async function makeDatabaseRequest<E extends ObjectLiteral, M extends AllowedMethods>(entity: EntityTarget<E>, method: M, ...args: Parameters<Repository<E>[M]>): Promise<ErrorWrapperReturnType<Awaited<ReturnType<Repository<E>[M]>>>> {
    const repository = AppDataSource.getRepository(entity)
    // @ts-ignore: Parameters can't infer types with generics
    return wrapErrorAsync(repository[method].bind(repository), ...args)
}