import ConstObjectType from "../types/utils/const-object-type";

export default function requestFactory(constObject: ConstObjectType) {
    return async function(endpoint: string, options: Record<string, any>): Promise<Response> {
        const url = constObject.URL.API_ROOT + endpoint
        if (options.body) options.body = JSON.stringify(options.body)
        const res = await fetch(url, {
            headers: constObject.AUTH_HEADERS,
            ...options
        })
        if (!res.ok) {
            const data = await res.json()
            console.log(res.status)
            throw new Error(JSON.stringify(data))
        }
        return res;
    }
}