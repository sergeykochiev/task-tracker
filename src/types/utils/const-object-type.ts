interface ConstObjectType {
    URL: {
        API_ROOT: string,
        ENDPOINTS: Record<string, string | ((...args: string[]) => string)>
    }
    AUTH_HEADERS: Record<string, string>
}

export default ConstObjectType