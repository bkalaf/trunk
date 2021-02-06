import React from 'react';
import { filterArray } from '../../core/tc/array/filterArray';
import { isEmpty } from '../../core/text';
import { Children } from '../Children';
import { IBaseProps } from '../IBaseProps';
import { prependArray } from "../prependArray";
import { coalesce } from "../../core/coalesce";
import { isNotNull, isNotNullOrEmpty } from '../isNotNull';

export interface IContainerProps extends IBaseProps {
    fullWidth: boolean;
}
function handle(props: Partial<IContainerProps>): IContainerProps {
    return { ...props, fullWidth: coalesce(false)(props.fullWidth) }
}
function reduce(props: IContainerProps): [Omit<IContainerProps, 'fullWidth'>, string[], Children] {
    const { fullWidth, className, children, ...spread } = props;
    if (fullWidth) {
        return [spread, [ 'container-fluid' ], children ]
    }
    return [spread, ['container'], children ];
}
export function distinct<T>(operand: T[]) {
    function inner(remain: T[], accum: T[]): T[] {
        if (isEmpty(remain)) {
            return [];
        }
        const [head, ...tail] = remain;
        if (accum.includes(head)) {
            return inner(tail, accum);
        }
        return inner(tail, prependArray(head)(accum));
    }
    return inner(operand, []);
}
export function constructClassName(cn: string = '', ...classes: string[]): string {
    const c = prependArray(cn)(classes);
    const c2 = filterArray(isNotNullOrEmpty)(c);
    const c3 = distinct(c2);
    return c3.join(' ');
}
export function Container(props: IContainerProps) {
    const [spread, cn, children] = reduce(props);
    return <div className={constructClassName(...cn)}>{children}</div>
}