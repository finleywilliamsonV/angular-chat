import { User } from "./objects/user"

export const sanitize = <T>(o: T): T => {
    return Object.assign({}, o) as T
}

/**
 * Returns the next highest id for a given collection
 */
export const getNextId = (collection: { id: number }[]): number => {

    // find the highest id
    const highestId: number = collection.reduce((acc: number, curr: { id: number }) => {
        if (curr.id > acc) {
            return curr.id
        }
        return acc
    }, 0)

    // return the highest +1
    return highestId + 1
}