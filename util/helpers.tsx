export function getLastElement<Type>(array: Type[]): Type | null {
    if (array.length == 0) {
        return null
    }
    return array[array.length - 1]
}