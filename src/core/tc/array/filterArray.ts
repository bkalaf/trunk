import { isEmpty, Predicate } from '../../text';
import { prependArray } from "../../../components/prependArray";

export function filterArray<T>(predicate: Predicate<T>): (arr: T[]) => T[] {
    function inner(remain: T[], accum: T[]): T[] {
        if (isEmpty(remain)) {
            return [];
        }
        const [head, ...tail] = remain;
        if (predicate(head)) {
            return inner(tail, prependArray(head)(accum));
        }
        return inner(tail, accum);
    }
    return function (arr: T[]): T[] {
        return inner(arr, []);
    };
}
