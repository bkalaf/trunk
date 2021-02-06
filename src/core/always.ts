export function always<T>(operand: T) {
    return function (_y: unknown) {
        return operand;
    };
}
