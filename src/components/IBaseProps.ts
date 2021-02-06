import { Children } from './Children';
import { concatArray } from "../core/tc/array/concatArray";
import { guardArray } from '../core/tc/array/guardArray';
import React from 'react';
import { isNotNull } from './isNotNull';
import { prependArray } from './prependArray';

type PropsHandlerFunc = <T extends IBaseProps, THandled extends string>(
    props: T
) => Omit<T, THandled>;
type PropsReducer<
    T extends IBaseProps = IBaseProps,
    THandled extends string = string
> = (
    props: T
) => [spread: Omit<T, THandled>, classList: string[], childs: Children];

export interface IBaseProps {
    id?: string;
    className?: string;
    children?: Children;
    propsHandler?: PropsHandlerFunc;
}

export type AnyFunction = (...args: any[]) => any;

export type Length<T> = T extends { length: number } ? T['length'] : never;
export type LengthMin1<T> = Length<T> extends 1
    ? 0
    : Length<T> extends 2
    ? 1
    : Length<T> extends 3
    ? 2
    : Length<T> extends 4
    ? 3
    : 4;

export function isNull(operand: unknown): operand is null | undefined {
    return operand == null;
}
export type Nullable<T> = T | null | undefined;

export function composeK<
    T extends IBaseProps,
    TKey extends string,
    TKey2 extends string
>(
    operand1: PropsReducer<T, TKey>,
    operand2: PropsReducer<Omit<T, TKey>, TKey2>
) {
    return (props: T) => {
        const { className, children, propsHandler, ...spread } = props;
        const newSpread = propsHandler ? propsHandler(spread) : spread;
        const [o1, o2, o3] = operand1(newSpread as T);
        const classes = guardArray<Nullable<string>, string>(isNotNull)(
            prependArray(className)(o2)
        );
        const [p1, p2, p3] = operand2(o1);
        const classes2 = guardArray<Nullable<string>, string>(isNotNull)(
            prependArray(classes.join(' '))(p2)
        );

        const finalClassName = classes2.join(' ');
        const finalChildren = concatArray(
            React.Children.toArray(children),
            concatArray(React.Children.toArray(o3), React.Children.toArray(p3))
        );
    };
}
