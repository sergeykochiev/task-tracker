interface TypedResponse<Type extends any = undefined> extends Response {
    json: () => Promise<[Type] extends [never] ? undefined : Type>
}

export default TypedResponse