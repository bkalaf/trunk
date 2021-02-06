export type PropsWriter<T> = [props: T, cl: string[]];

export function of<T>(props: T): PropsWriter<T> {
    return [props, []];
}
export function chain<T, U>(
    fM: (x: T) => PropsWriter<U>,
    x: PropsWriter<T>
): PropsWriter<U> {
    const [value, log] = x;
    const [value2, log2] = fM(value);
    return [value2, [...log, ...log2]];
}
export function ap<T, U>(fM: PropsWriter<(x: T) => U>, xM: PropsWriter<T>): PropsWriter<U> {
    return chain((f) => chain((x) => of(f(x)), xM), fM);
}
export function fmap<T, U>(f: (x: T) => U, xM: PropsWriter<T>): PropsWriter<U> {
    return ap(of(f), xM);
}
export function lift2n<T, U, V>(f: (x: T) => (y: U) => V, xM: PropsWriter<T>, yM: PropsWriter<U>): PropsWriter<V> {
    return ap(ap(of(f), xM), yM);
}