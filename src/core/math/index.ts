export function prod(operand1: number) {
    return function (operand2: number) {
        return operand1 * operand2;
    }
}
export function floor(operand: number) {
    return Math.floor(operand);
}