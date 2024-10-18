import { ErrorWrapperReturnType, wrapErrorAsync } from "./wrap-error"

export type RequestBody = Record<string, any>
export type ParsedBody = RequestBody | null | undefined
export type UnparsedBodyRequestInit = Omit<RequestInit, "body"> & { body?: any }
export type RequestReturn<T extends ParsedBody, E extends ParsedBody> = {
    status: number,
} & ({
    ok: true,
    data: T
} | {
    ok: false,
    data: E
})

async function innerMakeRequest(url: string, options: RequestInit) {
    const res = await fetch(url, options)
    return {
        ok: res.ok,
        status: res.status,
        data: await res.json()
    }
}

export default async function makeRequest<T extends ParsedBody, E extends ParsedBody>(url: string, options: UnparsedBodyRequestInit): Promise<ErrorWrapperReturnType<RequestReturn<T, E>>> {
    if (options && options.body) options.body = JSON.stringify(options.body)
    return wrapErrorAsync(innerMakeRequest, url, options)
}