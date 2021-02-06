
export function composeR<T, U, V>(
    f: (x: T) => U,
    g: (x: U) => V
): (operand: T) => V {
    return function (operand: T) {
        return g(f(operand));
    };
}
