import { filterArray } from "./filterArray";

export function guardArray<T, U extends T>(guard: (x: T) => x is U): (arr: T[]) => U[] {
    return (arr: T[]): U[] => (filterArray<T>(guard)(arr) as any) as U[];
}
