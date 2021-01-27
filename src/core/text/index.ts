export function isEmpty(target: unknown): boolean {
    if (Object.getOwnPropertyNames(target).includes('length')) {
        return (target as any).length === 0;
    }
    return false;
}
export type Predicate<T> = (x: T) => boolean;

export function compl<T>(predicate: Predicate<T>): Predicate<T> {
    return (operand: T) => !predicate(operand);
}
const isNotEmpty = compl(isEmpty);

export function isA<T>(name: string): Predicate<unknown> {
    return function(operand: unknown): operand is T {
        return typeof operand === name;
    }
}
const isUndefined = isA<undefined>('undefined');
export function isNull(operand: unknown): operand is (null | undefined) {
    return operand == null;
}
export function both<T>(predicate1: Predicate<T>) {
    return function (predicate2: Predicate<T>) {
        return function (operand: T) {
            return predicate1(operand) ? predicate2(operand) : false;
        }
    }
}
export const isTrueNull: (operand: unknown) => operand is null = both(isNull)(compl(isUndefined)) as any;
export const isNotEmptyOrNull: <T>(operand: unknown) => operand is NonNullable<T> = 
    both(compl(isNull))(isNotEmpty) as any;
export function contains(target: string) {
    return function (source: string) {
        return isNotEmptyOrNull(target) ? isNotEmptyOrNull(source) ? source.includes(target) : false : false;
    }
}
