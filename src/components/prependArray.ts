
export function prependArray<T>(operand: T) {
    return function (arr: T[]) {
        return [operand, ...arr];
    };
}
