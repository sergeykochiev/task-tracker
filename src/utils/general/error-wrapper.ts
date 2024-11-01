export type ErrorWrapperReturnType<Data> = {
    err: Error | string,
    data: null
} | {
    err: null,
    data: Data
}

export async function wrapErrorAsync<T, A extends any[]>(callback: (...args: A) => Promise<T>, ...args: A): Promise<ErrorWrapperReturnType<Awaited<T>>> {
    try {
        const result = await callback(...args)
        return {
            err: null,
            data: result
        }
    } catch(e) {
        console.error(e)
        return {
            err: e as Error,
            data: null
        }
    }
}