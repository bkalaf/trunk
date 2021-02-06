
export function createFrom<T>(func: () => T) {
    return function (length: number): T[] {
        if (length === 0) {
            return [];
        }
        return [func(), ...createFrom(func)(length - 1)];
    };
}
