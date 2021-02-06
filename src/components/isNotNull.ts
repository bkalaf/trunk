import { compl, isEmpty, isTrueNull, Predicate } from '../core/text';
import { Nullable, isNull } from './IBaseProps';

export function isNotNull<T>(operand: Nullable<T>): operand is T {
    return compl(isNull)(operand);
}

export function either<T>(predicate1: Predicate<T>) {
    return function(predicate2: Predicate<T>) {
        return function (operand: T) {
            return predicate1(operand) ? true : predicate2(operand); 
        }
    }
}
export function both<T>(predicate1: Predicate<T>) {
    return function(predicate2: Predicate<T>) {
        return function(operand: T) {
            return predicate1(operand) ? predicate2(operand) : false;
        }
    }
}
const isNotEmpty = compl(isEmpty);

export const isNullOrEmpty = either(isTrueNull)(isEmpty);
export const isNotNullOrEmpty = both(isNotNull)(isNotEmpty);
